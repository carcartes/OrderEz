import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';  // Importa el CarritoService
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
  standalone: false
})
export class ProductoPage implements OnInit {
  producto: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private carritoService: CarritoService  // Inyecta el CarritoService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(productId);
    }
  }

  loadProduct(id: string) {
    this.productoService.getProductById(id).then((producto) => {
      if (producto) {
        this.producto = producto;
      }
    });
  }

  agregarAlCarrito(producto: Product) {
    const quantity = 1;  // Agrega 1 al carrito por defecto
    this.carritoService.agregarAlCarrito(producto, quantity);
  }
}
