import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';  // Importa el CarritoService
import { Product } from '../../models/product.model';
import { ToastController } from '@ionic/angular'; // Importa ToastController

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
    private carritoService: CarritoService,  // Inyecta el CarritoService
    private toastController: ToastController // Inyecta ToastController
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

  async agregarAlCarrito(producto: Product) {
    const quantity = 1; // Agrega 1 al carrito por defecto
    this.carritoService.agregarAlCarrito(producto, quantity);

    // Mostrar Toast de "Agregado con éxito"
    const toast = await this.toastController.create({
      message: 'Producto agregado con éxito al carrito',
      duration: 1000, // Duración en milisegundos
      position: 'bottom',
      color: 'light', // Color del Toast
    });

    await toast.present();
  }
}
