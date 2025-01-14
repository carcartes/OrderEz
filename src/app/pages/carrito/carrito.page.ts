import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { CarritoProduct } from '../../services/carrito.service'; 
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: false
})
export class CarritoPage implements OnInit, OnDestroy {
  cartItems: CarritoProduct[] = [];
  private cartSubscription: Subscription = new Subscription();;

  constructor(
    private carritoService: CarritoService,
    private router: Router
  ) {}

  ngOnInit() {
    // Suscribirse al Observable para obtener los productos del carrito
    this.cartSubscription = this.carritoService.getCarritoProductos().subscribe(products => {
      this.cartItems = products;
    });
  }

  ngOnDestroy() {
    // Desuscribirse cuando el componente sea destruido
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
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
}

