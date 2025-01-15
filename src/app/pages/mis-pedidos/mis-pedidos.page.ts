import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  userId: string | null = null;

  constructor(
    private carritoService: CarritoService, 
    private router: Router, 
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Nos suscribimos para obtener el UID del usuario actual
    this.authService.getUserId().subscribe(userId => {
      this.userId = userId;  // Guardamos el UID
      if (this.userId) {
        this.cargarPedidos(); // Cargamos los pedidos solo si el usuario está autenticado
      }
    });
  }

  // Método para cargar pedidos
  cargarPedidos() {
    if (!this.userId) {
      console.error('No se ha encontrado el UID del usuario');
      return;
    }

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

      // Filtrar pedidos por el SoliId que coincide con el userId del usuario autenticado
      this.pedidosActuales = pedidos.filter(pedido => pedido.solicitadoPorId === this.userId && pedido.estado !== 'Entregado');
      this.pedidosPasados = pedidos.filter(pedido => pedido.solicitadoPorId === this.userId && pedido.estado === 'Entregado');
    });
  }

  // Método para manejar el clic en "Ver"
  verDetalle(pedido: any) {
    console.log('Ver detalle del pedido:', pedido); // Verifica que el pedido tiene los productos
    this.router.navigate(['/detalle-pedido'], { state: { pedido } });
  }
}
