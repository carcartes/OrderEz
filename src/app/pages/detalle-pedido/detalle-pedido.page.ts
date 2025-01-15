import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.page.html',
  styleUrls: ['./detalle-pedido.page.scss'],
  standalone: false
})
export class DetallePedidoPage implements OnInit {
  pedido: any;

  constructor(private router: Router, private location: Location) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['pedido']) {
      this.pedido = navigation.extras.state['pedido'];
      console.log('Pedido recibido:', this.pedido); // Verifica que los productos y el total están incluidos
    }
  }

  goBack() {
    this.location.back();
  }
}
