import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-catalogo',
  templateUrl: 'catalogo.page.html',
  styleUrls: ['catalogo.page.scss'],
  standalone: false
})
export class CatalogoPage {
  isFilterModalOpen: boolean = false;
  selectedCategory: string = '';
  products = [
    { name: 'Coca-Cola', price: 'CLP 1,500', status: 'Agotado', category: 'bebidas', image: 'assets/coca-cola.jpg' },
    { name: 'Completo Italiano', price: 'CLP 2,500', status: 'Disponible', category: 'completos', image: 'assets/italiano.webp' },
    // Añadir más productos aquí según sea necesario
  ];
  filteredProducts = this.products;

  constructor(private modalController: ModalController) {}

  // Función para abrir el modal de filtros
  openFilterModal() {
    this.isFilterModalOpen = true;
  }

  // Función para cerrar el modal de filtros
  closeFilterModal() {
    this.isFilterModalOpen = false;
  }

  // Función cuando se aplica el filtro
  applyFilter() {
    if (this.selectedCategory) {
      this.filteredProducts = this.products.filter(product => product.category === this.selectedCategory);
    } else {
      this.filteredProducts = this.products; // Si no se selecciona categoría, mostrar todos los productos
    }
    this.closeFilterModal();
  }

  // Evento cuando el modal es cerrado
  onFilterModalDismiss() {
    console.log('El modal se ha cerrado');
  }
}
