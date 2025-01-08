import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-mesa',
  templateUrl: './detalle-mesa.page.html',
  styleUrls: ['./detalle-mesa.page.scss'],
  standalone: false
})
export class DetalleMesaPage {
  mesaId: number;
  detallesPedido = {
    mesaId: 1,
    cliente: 'Juan Pérez',
    items: [
      { nombre: 'Italiano', cantidad: 1, precio: 2500 },
      { nombre: 'Coca-Cola', cantidad: 2, precio: 1000 },
    ],
    total: 25.50,
    estado: 'Recibido',
  };

  constructor(private route: ActivatedRoute) {
    this.mesaId = Number(this.route.snapshot.paramMap.get('id'));
    // Aquí iría la lógica para obtener los detalles del pedido de la mesa
  }

  updateEstado(nuevoEstado: string) {
    // Aquí iría la lógica para actualizar el estado del pedido
    console.log('Actualizar estado del pedido a', nuevoEstado);
  }
}
