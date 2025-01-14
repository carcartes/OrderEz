import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.page.html',
  styleUrls: ['./edit-producto.page.scss'],
  standalone: false
})
export class EditProductoPage implements OnInit {
  product: Product = { id: '', name: '', price: 0, category: '', image: '', status: '' }; // Producto a editar

  categories = ['Pastas', 'Pizzas', 'Hamburguesas', 'Sandwiches', 'Ensaladas', 'Postres'];
  statuses = ['Disponible', 'Agotado'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
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

  // Función para guardar los cambios del producto
  async saveProduct() {
    try {
      if (this.product.id) {
        await this.productoService.updateProduct(this.product);
        this.router.navigate(['/catalogo']);
      }
    } catch (error) {
      console.error('Error al guardar el producto: ', error);
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
