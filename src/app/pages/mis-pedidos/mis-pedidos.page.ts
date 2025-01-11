import { Component } from '@angular/core';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: 'mis-pedidos.page.html',
  styleUrls: ['mis-pedidos.page.scss'],
  standalone: false
})
export class MisPedidosPage {
  segment: string = 'actuales'; // Valor inicial, mostrando los pedidos actuales

  constructor() {}
}
