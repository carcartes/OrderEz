import { Component } from '@angular/core';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.page.html',
  styleUrls: ['./administracion.page.scss'],
  standalone: false
})
export class AdministracionPage {
  mesas = [
    { id: 1, cliente: 'Juan Pérez', total: 10000, estado: 'Pendiente' },
    { id: 2, cliente: 'Ana Gómez', total: 5000, estado: 'Pendiente' },
    { id: 3, cliente: 'Carlos López', total: 7000, estado: 'Pendiente' },
  ];

  constructor() {}

  goToDetalleMesa(mesaId: number) {
    // Aquí iría la navegación a la página de detalle de la mesa
    console.log('Ver detalles de la mesa', mesaId);
  }

  updateEstado(mesaId: number, nuevoEstado: string) {
    // Aquí iría la lógica para actualizar el estado del pedido
    const mesa = this.mesas.find(mesa => mesa.id === mesaId);
    if (mesa) {
      mesa.estado = nuevoEstado;
      console.log('Estado de la mesa', mesaId, 'actualizado a', nuevoEstado);
    }
  }
}
