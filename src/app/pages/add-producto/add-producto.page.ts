import { Component } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';  // Importar ToastController

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.page.html',
  styleUrls: ['./add-producto.page.scss'],
  standalone: false
})
export class AddProductoPage {
  productName: string = '';
  productPrice: number = 0;
  productCategory: string = '';
  productStatus: string = '';
  imageFile: File | null = null;
  categories = ['Pastas', 'Pizzas', 'Appetizers', 'Sandwiches', 'Ensaladas', 'Postres'];
  statuses = ['Disponible', 'Agotado'];

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private toastController: ToastController  // Inyectar ToastController
  ) { }

  // Función para manejar la selección de imagen
  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    } else {
      console.error('No se seleccionó una imagen');
    }
  }

  // Función para mostrar el Toast
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color,  // Color del toast (success, danger, etc.)
    });
    await toast.present();
  }

  // Función para agregar el producto
  // Función para agregar el producto
  async addProduct() {
    // Validar que todos los campos sean obligatorios
    if (!this.productName || !this.productPrice || !this.productCategory || !this.productStatus || !this.imageFile) {
      await this.presentToast('Todos los campos son obligatorios', 'danger');  // Toast de error
      return;
    }

    // Validar que el precio sea mayor a 0
    if (this.productPrice <= 0) {
      await this.presentToast('El precio debe ser mayor a 0', 'danger');  // Toast de error
      return;
    }

    try {
      // Asegurándote de que la propiedad 'image' esté presente en el nuevo producto
      const newProduct = {
        name: this.productName,
        price: this.productPrice,
        category: this.productCategory,
        status: this.productStatus,
        agotado: false,
        image: '' // Agregar un campo de imagen vacío
      };

      // Agregar producto con la imagen subida a Cloudinary
      await this.productoService.addProduct(newProduct, this.imageFile);

      // Mostrar Toast de éxito
      await this.presentToast('Producto agregado al menú con éxito', 'light');

      // Redirigir al catálogo después de agregar el producto
      this.router.navigate(['/catalogo']);
    } catch (error) {
      console.error('Error al agregar producto:', error);
      await this.presentToast('Error al agregar el producto', 'danger');  // Toast de error
    }
  }


  // Redirige a la página de catálogo
  goToCatalogo() {
    this.router.navigate(['/catalogo']);
  }
}
