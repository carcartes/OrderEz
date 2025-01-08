import { Component } from '@angular/core';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.page.html',
  styleUrls: ['./mis-pedidos.page.scss'],
  standalone: false
})
export class MisPedidosPage {
  pedidos = [
    { id: 1, mesa: 3, estado: 'Pendiente', total: 12000 },
  ];

  constructor() {}

  // Aquí se podría agregar la lógica para navegar a los detalles de un pedido
  verDetalles(pedidoId: number) {
    console.log('Ver detalles del pedido', pedidoId);
  }
}
