import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.page.html',
  styleUrls: ['./mis-pedidos.page.scss'],
  standalone: false
})
export class MisPedidosPage implements OnInit {
  segment = 'actuales';  // Por defecto, se muestra 'Pedidos Actuales'
  pedidosActuales: any[] = [];
  pedidosPasados: any[] = [];

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit() {
    this.cargarPedidos();
  }

  // Método para cargar pedidos
  cargarPedidos() {
    this.carritoService.getPedidosByUser().subscribe(pedidos => {
      pedidos.forEach(pedido => {
        console.log('Pedidos cargados:', pedidos);
        if (pedido.fecha && pedido.fecha.seconds) {
          pedido.fecha = new Date(pedido.fecha.seconds * 1000); // Convertir Timestamp a Date
        }
        // Asignar valores por defecto si faltan campos
      pedido.nombre = pedido.solicitadoPor || 'Usuario desconocido';
      pedido.mesa = pedido.mesaNombre || 'Sin mesa asignada';
      });

      
  
      this.pedidosActuales = pedidos.filter(pedido => pedido.estado === 'Pendiente');
      this.pedidosPasados = pedidos.filter(pedido => pedido.estado === 'Entregado');
    });
  }
  
  // Método para manejar el clic en "Ver"
  verDetalle(pedido: any) {
    console.log('Ver detalle del pedido:', pedido); // Verifica que el pedido tiene los productos
    this.router.navigate(['/detalle-pedido'], { state: { pedido } });
  }
  
}
