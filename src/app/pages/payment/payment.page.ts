import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: false
})
export class PaymentPage implements OnInit {

  constructor(private router: Router) {}


  // Función para redirigir a la página de inicio
  goHome() {
    this.router.navigate(['/carrito']);
  }


  ngOnInit() {
  }

}
