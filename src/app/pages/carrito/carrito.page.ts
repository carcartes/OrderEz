import { Component } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: false
})
export class CarritoPage {
  cartItems = [
    { name: 'Italiano', price: 2500, quantity: 1, image: 'assets/italiano.jpg' },
    { name: 'Coca-Cola', price: 1000, quantity: 2, image: 'assets/coca-cola.jpg' },
    { name: 'Chucrut', price: 1500, quantity: 1, image: 'assets/chucrut.jpg' },
  ];

  get total() {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  }

  increaseQuantity(index: number) {
    this.cartItems[index].quantity++;
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    }
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }
}
