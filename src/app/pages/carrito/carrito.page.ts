import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { CarritoProduct } from '../../services/carrito.service'; 
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';  // Importa ToastController

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: false
})
export class CarritoPage implements OnInit, OnDestroy {
  cartItems: CarritoProduct[] = [];
  private cartSubscription: Subscription = new Subscription();
  mesa: string = '';  // Aquí asigna tu ID de la mesa, puede venir de algún servicio o 
  mesaNombre: string = '';  // Aquí se guardará el nombre de la mesa

  constructor(
    private carritoService: CarritoService,
    private router: Router,
    private toastController: ToastController  // Inyecta ToastController
  ) {}

  ngOnInit() {
    // Suscribirse al Observable para obtener los productos del carrito
    this.cartSubscription = this.carritoService.getCarritoProductos().subscribe(products => {
      this.cartItems = products;
    });

    this.loadMesaNombre();  // Cargar el nombre de la mesa cuando se inicie el componente
  }

  ngOnDestroy() {
    // Desuscribirse cuando el componente sea destruido
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  // Función para cargar el nombre de la mesa
  loadMesaNombre() {
    console.log('Cargando ID de la mesa:', this.mesa);  // Agregado para verificar el ID
    this.carritoService.getMesaNombreById(this.mesa).subscribe(nombre => {
      console.log('Nombre de la mesa recibido:', nombre);  // Agregado para verificar el nombre
      this.mesaNombre = nombre;  // Asigna el nombre de la mesa
    });
  }

  // Función para redirigir a la página de inicio
  goHome() {
    this.router.navigate(['/home']);
  }

  // Función para calcular el total del carrito
  getTotal() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Incrementar la cantidad del producto
  increaseQuantity(item: CarritoProduct) {
    item.quantity++;
    this.carritoService.updateProductQuantity(item);  // Actualiza la cantidad en el servicio
  }

  // Disminuir la cantidad del producto
  decreaseQuantity(item: CarritoProduct) {
    if (item.quantity > 1) {
      item.quantity--;
      this.carritoService.updateProductQuantity(item);  // Actualiza la cantidad en el servicio
    } else {
      this.removeProduct(item);  // Si la cantidad llega a 0, eliminar el producto
    }
  }

  // Eliminar un producto del carrito
  removeProduct(item: CarritoProduct) {
    this.carritoService.removeProductFromCarrito(item);  // Llamar al servicio para eliminar el producto
  }

  // Función para solicitar el pedido y mostrar un Toast
  async solicitarPedido() {
    this.carritoService.solicitarPedido();  // Solicita el pedido
    await this.presentToast();  // Muestra el Toast de éxito
    this.goHome(); // Redirige al Home después de realizar el pedido
  }

  // Función para mostrar el Toast de "Pedido solicitado con éxito"
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Pedido solicitado con éxito',
      duration: 1000,  // Duración en milisegundos
      position: 'bottom',
      color: 'light',  // Color verde de éxito
    });

    await toast.present();
  }
}
