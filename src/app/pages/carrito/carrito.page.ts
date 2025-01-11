import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: false
})
export class CarritoPage {
  // Array de productos en el carrito
  cartItems = [
    {
      name: 'Completo Italiano',
      price: 2500,
      quantity: 1,
      image: 'assets/images/completo-italiano.jpg'
    },
    {
      name: 'Coca Cola',
      price: 1000,
      quantity: 1,
      image: 'assets/images/coca-cola.jpg'
    }
  ];

  constructor(private router: Router) {}

  // Función para disminuir la cantidad
  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    }
  }

  // Función para aumentar la cantidad
  increaseQuantity(index: number) {
    this.cartItems[index].quantity++;
  }

  // Función para redirigir a la página de inicio
  goHome() {
    this.router.navigate(['/home']);
  }

  // Función para calcular el total del carrito
  getTotal() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Función para agregar un producto al carrito (puedes personalizarla)
  addItem() {
    const newItem = {
      name: 'Nuevo Producto',
      price: 1500,
      quantity: 1,
      image: 'assets/images/nuevo-producto.jpg'
    };
    this.cartItems.push(newItem);
  }
}