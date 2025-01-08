import { Component } from '@angular/core';

@Component({
  selector: 'app-detalle-mesa',
  templateUrl: './detalle-mesa.page.html',
  styleUrls: ['./detalle-mesa.page.scss'],
  standalone: false
})
export class DetalleMesaPage {
  orden = {
    mesa: 1,
    cliente: 'Juan Pérez',
    productos: [
      { categoria: 'Completos', nombre: 'Italiano', cantidad: 2, imagen: 'assets/italiano.jpg' },
      { categoria: 'Completos', nombre: 'Chileno', cantidad: 1, imagen: 'assets/chileno.jpg' },
      { categoria: 'Bebidas', nombre: 'Coca-Cola', cantidad: 3, imagen: 'assets/coca-cola.jpg' },
      { categoria: 'Bebidas', nombre: 'Fanta', cantidad: 2, imagen: 'assets/fanta.jpg' },
    ]
  };

  constructor() {}
}
