import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { Location } from '@angular/common';
@Component({
  selector: 'app-detalle-mesa',
  templateUrl: './detalle-mesa.page.html',
  styleUrls: ['./detalle-mesa.page.scss'],
  standalone: false
})
export class DetalleMesaPage {
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

  constructor(private router: Router, private location: Location) {}


  // Función para redirigir a la página de inicio
  // Función para ir a la página anterior
  goBack() {
    this.location.back();
  }


 
}