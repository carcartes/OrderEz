import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { ProductoService } from './producto.service';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mesa } from '../models/mesa.model'; // Interfaz Mesa
import { switchMap, map } from 'rxjs/operators';  // Asegúrate de importar switchMap y map



// Exporta la interfaz CarritoProduct para poder usarla en otros archivos
export interface CarritoProduct extends Product {
  quantity: number;  // Se agrega el campo quantity
}

interface CarritoData {
  userId: string;
  products: CarritoProduct[];  // Cambiado a CarritoProduct
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoSubject: BehaviorSubject<CarritoProduct[]> = new BehaviorSubject<CarritoProduct[]>([]);  // Usamos BehaviorSubject
  carrito$ = this.carritoSubject.asObservable();  // Observable para que los componentes se suscriban

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private productoService: ProductoService
  ) { }

  // Cargar productos por categoría
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.productoService.getProductsByCategory(category);
  }

  // Agregar un producto al carrito con un campo quantity
  agregarAlCarrito(product: Product, quantity: number = 1): void {
    this.authService.getUserProfile().subscribe(user => {
      if (user) {
        const userId = user.uid;
        const carritoRef = this.firestore.collection('carritos').doc(userId);

        carritoRef.get().toPromise().then(doc => {
          if (doc && doc.exists) { // Asegurarse de que 'doc' no es 'undefined' y existe
            const carritoData = doc.data() as CarritoData;
            if (carritoData && carritoData.products) {
              // Comprobar si el producto ya existe en el carrito
              const existingProductIndex = carritoData.products.findIndex(p => p.id === product.id);
              if (existingProductIndex > -1) {
                // Si el producto ya está en el carrito, incrementar la cantidad
                carritoData.products[existingProductIndex].quantity += quantity;
              } else {
                // Si el producto no está en el carrito, agregarlo con la cantidad inicial
                const newProduct: CarritoProduct = { ...product, quantity };
                carritoData.products.push(newProduct);
              }
              carritoRef.update({ products: carritoData.products }).then(() => {
                this.carritoSubject.next(carritoData.products);  // Actualiza el estado local del carrito
                console.log('Producto agregado o cantidad actualizada en el carrito');
              }).catch((error) => {
                console.error('Error al actualizar el carrito:', error);
              });
            }
          } else {
            // El carrito no existe, crear uno nuevo con el producto y cantidad
            const newProduct: CarritoProduct = { ...product, quantity };
            carritoRef.set({
              userId: userId,
              products: [newProduct] // Crear carrito con el producto y cantidad
            }).then(() => {
              this.carritoSubject.next([newProduct]);  // Actualiza el estado local del carrito
              console.log('Carrito creado y producto agregado');
            }).catch((error) => {
              console.error('Error al crear el carrito:', error);
            });
          }
        }).catch((error) => {
          console.error('Error al acceder al carrito:', error);
        });
      }
    });
  }

  // Obtener los productos del carrito, incluyendo la cantidad
  getCarritoProductos(): Observable<CarritoProduct[]> {  // Cambiado a CarritoProduct[]
    this.authService.getUserProfile().subscribe(user => {
      if (user) {
        const userId = user.uid;
        const carritoRef = this.firestore.collection('carritos').doc(userId);

        carritoRef.get().toPromise().then(doc => {
          if (doc && doc.exists) {
            const carritoData = doc.data() as CarritoData;
            if (carritoData && carritoData.products) {
              this.carritoSubject.next(carritoData.products);  // Actualiza el estado local del carrito
            } else {
              this.carritoSubject.next([]);  // Si no hay productos, actualizar a array vacío
            }
          } else {
            this.carritoSubject.next([]);  // Si no existe el carrito, actualizar a array vacío
          }
        }).catch(error => {
          console.error('Error al acceder a los productos del carrito:', error);
        });
      } else {
        this.carritoSubject.next([]);  // Si no hay usuario, actualizar a array vacío
      }
    });
    return this.carrito$;  // Retorna el observable
  }

  // Actualizar la cantidad de un producto en el carrito
  updateProductQuantity(product: CarritoProduct) {
    this.authService.getUserProfile().subscribe(user => {
      if (user) {
        const userId = user.uid;
        const carritoRef = this.firestore.collection('carritos').doc(userId);

        carritoRef.get().toPromise().then(doc => {
          if (doc && doc.exists) {
            const carritoData = doc.data() as CarritoData;
            if (carritoData && carritoData.products) {
              const productIndex = carritoData.products.findIndex(p => p.id === product.id);
              if (productIndex !== -1) {
                carritoData.products[productIndex] = product;  // Actualizar el producto con la nueva cantidad
                carritoRef.update({ products: carritoData.products }).then(() => {
                  this.carritoSubject.next(carritoData.products);  // Actualiza el estado local del carrito
                });
              }
            }
          }
        });
      }
    });
  }

  // Eliminar un producto del carrito
  removeProductFromCarrito(product: CarritoProduct) {
    this.authService.getUserProfile().subscribe(user => {
      if (user) {
        const userId = user.uid;
        const carritoRef = this.firestore.collection('carritos').doc(userId);

        carritoRef.get().toPromise().then(doc => {
          if (doc && doc.exists) {
            const carritoData = doc.data() as CarritoData;
            if (carritoData && carritoData.products) {
              const updatedProducts = carritoData.products.filter(p => p.id !== product.id);
              carritoRef.update({ products: updatedProducts }).then(() => {
                this.carritoSubject.next(updatedProducts);  // Actualiza el estado local del carrito
              });  // Eliminar el producto
            }
          }
        });
      }
    });
  }

  // Obtener las mesas desde Firestore con el ID del documento
  getMesas(): Observable<Mesa[]> {
    return this.firestore.collection('mesas').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Mesa;
        const id = a.payload.doc.id; // Obtener el ID del documento
        return { ...data, id }; // Correcto, el id debe ir al final para evitar sobrescribir
      }))
    );
  }

  agregarMesaAlCarrito(mesaId: string): void {
    this.authService.getUserProfile().subscribe(user => {
      if (user && user.uid) {
        const userId = user.uid; // ID del usuario autenticado
        const carritoRef = this.firestore.collection('carritos').doc(userId);

        // Verificar si el carrito del usuario existe
        carritoRef.get().toPromise().then(doc => {
          if (doc && doc.exists) {
            // Aquí pasamos el ID de la mesa
            carritoRef.update({ mesa: mesaId }).then(() => {
              console.log('Mesa agregada al carrito');
            }).catch(error => {
              console.error('Error al agregar la mesa al carrito:', error);
            });
          } else {
            console.error('El carrito no existe para este usuario');
          }
        }).catch(error => {
          console.error('Error al acceder al carrito:', error);
        });
      }
    });
  }

  solicitarPedido(): void {
    this.authService.getUserProfile().subscribe(user => {
      if (user && user.uid) {
        const userId = user.uid;
  
        // Obtén los datos del perfil del usuario
        const userRef = this.firestore.collection('users').doc(userId);
        userRef.get().toPromise().then(userDoc => {
          if (userDoc && userDoc.exists) {
            const userData = userDoc.data() as { firstName: string; lastName: string };
  
            // Obtén los datos del carrito actual
            const carritoRef = this.firestore.collection('carritos').doc(userId);
            carritoRef.get().toPromise().then(doc => {
              if (doc && doc.exists) {
                const carritoData = doc.data() as CarritoData & { mesa: string };
  
                if (carritoData.mesa) {
                  const mesaRef = this.firestore.collection('mesas').doc(carritoData.mesa);
                  mesaRef.get().toPromise().then(mesaDoc => {
                    if (mesaDoc && mesaDoc.exists) {
                      const mesaData = mesaDoc.data() as Mesa;
  
                      // Crear el nuevo pedido con todos los datos necesarios
                      const newPedido = {
                        productos: carritoData.products,
                        total: this.getTotalCarrito(carritoData.products),
                        fecha: new Date(),
                        estado: 'Pendiente',
                        solicitadoPor: `${userData.firstName} ${userData.lastName}`, // Nombre completo
                        solicitadoPorId: userId, // ID del usuario
                        mesaId: carritoData.mesa, // ID de la mesa
                        mesaNombre: mesaData.nombre || 'Mesa desconocida' // Nombre de la mesa
                      };
  
                      // Actualizar los pedidos en la mesa
                      const updatedPedidos = mesaData.pedidos ? [...mesaData.pedidos, newPedido] : [newPedido];
                      mesaRef.update({ pedidos: updatedPedidos }).then(() => {
                        console.log('Pedido agregado a la mesa:', carritoData.mesa);
  
                        // Limpia los productos del carrito pero mantiene la mesa intacta
                        carritoRef.update({ products: [] }).then(() => {
                          this.carritoSubject.next([]);
                          console.log('Carrito limpiado después del pedido, pero mesa intacta');
                        });
                      }).catch(error => {
                        console.error('Error al actualizar los pedidos de la mesa:', error);
                      });
                    } else {
                      console.error('La mesa no existe en Firestore');
                    }
                  }).catch(error => {
                    console.error('Error al obtener el documento de la mesa:', error);
                  });
                } else {
                  console.error('No se ha asignado ninguna mesa al carrito');
                }
              } else {
                console.error('El carrito no existe para este usuario');
              }
            }).catch(error => {
              console.error('Error al obtener el carrito:', error);
            });
          } else {
            console.error('El usuario no tiene un perfil válido en Firestore');
          }
        }).catch(error => {
          console.error('Error al obtener el perfil del usuario:', error);
        });
      } else {
        console.error('Usuario no autenticado');
      }
    });
  }
  
  

// CarritoService - Agregar método para obtener los pedidos
getPedidosByUser(): Observable<any[]> {
  return this.authService.getUserProfile().pipe(
    switchMap(user => {
      if (user && user.uid) {
        const userId = user.uid;
        const carritoRef = this.firestore.collection('carritos').doc(userId);

        return carritoRef.get().pipe(
          switchMap(doc => {
            if (doc && doc.exists) {
              const carritoData = doc.data() as CarritoData & { mesa: string };

              if (carritoData && carritoData.mesa) {
                const mesaRef = this.firestore.collection('mesas').doc(carritoData.mesa);
                return mesaRef.get().pipe(
                  map(mesaDoc => {
                    if (mesaDoc && mesaDoc.exists) {
                      const mesaData = mesaDoc.data() as Mesa;
                      return mesaData.pedidos || [];  // Retorna los pedidos de la mesa
                    }
                    return [];
                  })
                );
              }
              return [];
            }
            return [];
          })
        );
      }
      return [];
    })
  );
}



  

  // Método para calcular el total del carrito
  private getTotalCarrito(products: CarritoProduct[]): number {
    return products.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

}
