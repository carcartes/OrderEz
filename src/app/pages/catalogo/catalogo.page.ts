import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Product } from '../../models/product.model';  // Definimos el modelo

@Component({
  selector: 'app-catalogo',
  templateUrl: 'catalogo.page.html',
  styleUrls: ['catalogo.page.scss'],
  standalone: false
})
export class CatalogoPage implements OnInit {
  products: Product[] = [];  // Lista de productos
  filteredProducts: Product[] = this.products;  // Productos filtrados

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    // Nos suscribimos al observable de productos
    this.productoService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.filteredProducts = products; // Al recibir los productos, los filtramos si es necesario
    });
  }

  // Función para filtrar productos si es necesario (opcional)
  filterProducts(category: string) {
    if (category === '') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.category === category);
    }
  }

  // Función para eliminar un producto
  deleteProduct(productId: string | undefined) {
    if (!productId) {
      console.error('El ID del producto es inválido');
      return;
    }
  
    this.productoService.deleteProduct(productId).then(() => {
      // Actualizamos la lista de productos después de eliminar uno
      this.filteredProducts = this.filteredProducts.filter(product => product.id !== productId);
    }).catch(error => {
      console.error('Error al eliminar el producto:', error);
    });
  }
  
}
