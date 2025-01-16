import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service'; // Importa el CarritoService
import { Product } from '../../models/product.model';
import { ToastController } from '@ionic/angular'; // Importa ToastController

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
    private productoService: ProductoService,
    private carritoService: CarritoService, // Inyecta el CarritoService
    private toastController: ToastController // Inyecta ToastController
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

  async agregarAlCarrito(producto: Product) {
    const quantity = 1; // Cantidad predeterminada
    this.carritoService.agregarAlCarrito(producto, quantity);

    // Mostrar Toast de "Agregado con éxito"
    const toast = await this.toastController.create({
      message: 'Producto agregado con éxito',
      duration: 1000, // Duración en milisegundos
      position: 'bottom',
      color: 'light', // Color del Toast
    });

    await toast.present();
  }
}
