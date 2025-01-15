import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.page.html',
  styleUrls: ['./mesa.page.scss'],
  standalone: false
})
export class MesaPage implements OnInit {
  pedidos: any[] = [];
  mesaId: string = ''; 
  mesaNombre: string = '';
  currentSegment: string = 'actuales'; // Segmento inicial

  constructor(
    private carritoService: CarritoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener el ID de la mesa desde los parámetros de la ruta
    this.mesaId = this.route.snapshot.paramMap.get('id') || ''; // Maneja el caso cuando el valor es null

    if (this.mesaId) {
      this.carritoService.getPedidosByMesa(this.mesaId).subscribe(pedidos => {
        this.pedidos = pedidos;
        console.log('Pedidos de la mesa:', this.pedidos);
      });
      // Obtener el nombre de la mesa
      this.carritoService.getMesaNombreById(this.mesaId).subscribe(nombre => {
        this.mesaNombre = nombre;
      });
      
    } else {
      console.error('No se ha proporcionado el ID de la mesa');
    }
  }

  segmentChanged(event: any) {
    this.currentSegment = event.detail.value;
  }

  goBack() {
    this.router.navigate(['/pedidos-adm']);
  }

  // Método para cambiar el estado del pedido
  cambiarEstado(pedidoId: string, nuevoEstado: string) {
    if (!this.mesaId) {
      console.error('ID de la mesa no disponible');
      return;
    }

    // Llama al servicio para cambiar el estado del pedido
    this.carritoService.cambiarEstado(this.mesaId, pedidoId, nuevoEstado);
  }

  // Método para manejar el clic en "Ver"
  verDetalle(pedido: any) {
    console.log('Ver detalle del pedido:', pedido); // Verifica que el pedido tiene los productos
    this.router.navigate(['/detalle-pedido'], { state: { pedido } });
  }
}
