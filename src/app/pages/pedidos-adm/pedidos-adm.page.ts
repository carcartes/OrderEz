import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';  // Asegúrate de importar el servicio correcto
import { Mesa } from '../../models/mesa.model';  // Importa el modelo de Mesa

@Component({
  selector: 'app-pedidos-adm',
  templateUrl: './pedidos-adm.page.html',
  styleUrls: ['./pedidos-adm.page.scss'],
  standalone: false
})
export class PedidosAdmPage implements OnInit {
  mesas: Mesa[] = [];  // Arreglo para almacenar las mesas

  constructor(private carritoService: CarritoService) { }

  ngOnInit() {
    this.cargarMesas();
  }

  cargarMesas() {
    this.carritoService.getMesas().subscribe((mesasData) => {
      this.mesas = mesasData;  // Asigna las mesas obtenidas al arreglo
    });
  }
}
