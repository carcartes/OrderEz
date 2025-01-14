import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
  standalone: false
})
export class CategoriaPage implements OnInit {
  categoryName: string = '';
  destacados: Product[] = [];
  todos: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) {}

  ngOnInit() {
    this.categoryName = this.route.snapshot.paramMap.get('name') || '';
    this.loadProducts();
  }

  loadProducts() {
    this.productoService.getProductsByCategory(this.categoryName).subscribe(
      (products: Product[]) => {
        this.destacados = products.slice(0, 5); // Primeros 5 productos como destacados
        this.todos = products; // Todos los productos
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }
}
