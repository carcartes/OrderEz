import { Component } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Router } from '@angular/router';

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
  categories = ['Pastas', 'Pizzas', 'Appetizers', 'Sandwiches', 'Ensalada', 'Postres'];
  statuses = ['Disponible', 'Agotado'];

  constructor(private productoService: ProductoService, private router: Router) {}

  // Función para manejar la selección de imagen
  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    } else {
      console.error('No se seleccionó una imagen');
    }
  }
  

  // Función para agregar el producto
  async addProduct() {
    if (this.imageFile) {
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

      // Redirigir al catálogo después de agregar el producto
      this.router.navigate(['/catalogo']);
    }
  }

  // Redirige a la página de catálogo
  goToCatalogo() {
    this.router.navigate(['/catalogo']);
  }
}
