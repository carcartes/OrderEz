import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { ProductoService } from './producto.service';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';

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
  ) {}

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
}
