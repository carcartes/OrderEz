import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Product } from '../../models/product.model';

import { ToastController } from '@ionic/angular';  // Importa ToastController

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.page.html',
  styleUrls: ['./edit-producto.page.scss'],
  standalone: false
})
export class EditProductoPage implements OnInit {
  product: Product = { id: '', name: '', price: 0, category: '', image: '', status: '' }; // Producto a editar

  categories = ['Pastas', 'Apettizers', 'Pizzas', 'Sandwiches', 'Ensaladas', 'Postres'];
  statuses = ['Disponible', 'Agotado'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private toastController: ToastController  // Inyecta el ToastController
  ) {}

  ngOnInit() {
    const productId = this.activatedRoute.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(productId);
    }
  }

  // Cargar el producto desde el servicio
  async loadProduct(id: string) {
    try {
      const product = await this.productoService.getProductById(id);
      if (product) {
        this.product = product;
      } else {
        console.error('Producto no encontrado');
      }
    } catch (error) {
      console.error('Error al cargar el producto: ', error);
    }
  }

  // Función para mostrar Toast
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      color: color,  // 'success' o 'danger'
      position: 'bottom'
    });
    toast.present();
  }

  // Función para guardar los cambios del producto
  async saveProduct() {
    // Validar que todos los campos sean obligatorios
    if (!this.product.name || !this.product.price || !this.product.category || !this.product.status || !this.product.image) {
      await this.presentToast('Todos los campos son obligatorios', 'danger');  // Toast de error
      return;
    }

    // Validar que el precio sea mayor a 0
    if (this.product.price <= 0) {
      await this.presentToast('El precio debe ser mayor a 0', 'danger');  // Toast de error
      return;
    }

    try {
      if (this.product.id) {
        await this.productoService.updateProduct(this.product);
        await this.presentToast('Producto actualizado con éxito', 'light');  // Toast de éxito
        this.router.navigate(['/catalogo']);
      }
    } catch (error) {
      console.error('Error al guardar el producto: ', error);
      await this.presentToast('Error al guardar el producto', 'danger');  // Toast de error
    }
  }

  // Función para cambiar la imagen
  changeImage() {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/*';
    
    inputElement.click();
    inputElement.onchange = async (event: any) => {
      const file = event.target.files[0];
      if (file) {
        try {
          const imageUrl = await this.uploadImage(file);
          this.product.image = imageUrl; // Actualizar la URL de la imagen del producto
        } catch (error) {
          console.error('Error al subir la imagen:', error);
        }
      }
    };
  }

  // Función para subir la imagen a Cloudinary
  async uploadImage(file: File): Promise<string> {
    try {
      const response: any = await this.productoService.uploadImageToCloudinary(file).toPromise();
      return response.secure_url;
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      throw error;
    }
  }

  // Redirigir al catálogo
  goToCatalogo() {
    this.router.navigate(['/catalogo']);
  }
}
