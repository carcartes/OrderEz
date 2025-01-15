import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Mesa } from '../../models/mesa.model'; // Interfaz Mesa

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
  standalone: false
})
export class QrPage implements OnInit {
  mesas: Mesa[] = []; // Lista de mesas
  selectedMesa: string | null = null; // Mesa seleccionada por el usuario

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.loadMesas();
  }

  // Cargar las mesas desde Firestore
  loadMesas() {
    this.carritoService.getMesas().subscribe(mesas => {
      this.mesas = mesas;
    });
  }

  // Método para agregar la mesa seleccionada al carrito
  onMesaChange() {
    // Aquí verificamos que selectedMesa sea el ID de la mesa, no el nombre
    if (this.selectedMesa) {
      console.log("Mesa seleccionada (ID):", this.selectedMesa);
      this.carritoService.agregarMesaAlCarrito(this.selectedMesa);
    }
  }
  

}
