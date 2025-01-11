import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.page.html',
  styleUrls: ['./mesa.page.scss'],
  standalone:false
})
export class MesaPage {
  currentSegment: string = 'actuales'; // Controla el segmento activo

  constructor(private router: Router) {}

  // Cambia el segmento activo
  segmentChanged(event: any) {
    this.currentSegment = event.detail.value;
  }

  // Navegar de vuelta a pedidos-adm
  goBack() {
    this.router.navigate(['/pedidos-adm']);
  }

  // Método simulado para cambiar estado (solo visual)
  cambiarEstado() {
    alert('Cambiar estado del pedido.');
  }

  // Método simulado para ver detalles (solo visual)
  verDetalles() {
    alert('Ver detalles del pedido.');
  }
}
