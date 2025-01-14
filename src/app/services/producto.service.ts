import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private firestore: AngularFirestore, private http: HttpClient) {}

  // Obtener todos los productos como un observable
  getAllProducts(): Observable<Product[]> {
    return this.firestore.collection('productos').valueChanges({ idField: 'id' }) as Observable<Product[]>;
  }

  // Función para eliminar un producto
  deleteProduct(productId: string): Promise<void> {
    return this.firestore.collection('productos').doc(productId).delete();
  }

  // Obtener un producto por su ID
  async getProductById(id: string): Promise<Product | null> {
    try {
      const doc = await this.firestore.collection('productos').doc(id).get().toPromise();
  
      // Verificar si el documento y sus datos existen antes de acceder a sus propiedades
      if (doc && doc.exists) {
        const data = doc.data() as Product;
        return { id: doc.id, ...data };
      } else {
        console.error('Producto no encontrado');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      return null;
    }
  }
  

  // Subir imagen a Cloudinary y obtener la URL
  uploadImageToCloudinary(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'images');
    formData.append('api_key', '824135419896176');

    return this.http.post('https://api.cloudinary.com/v1_1/dbhobtfhs/image/upload', formData);
  }

  // Agregar un producto a Firestore con la URL de la imagen de Cloudinary
  async addProduct(product: Product, file: File): Promise<void> {
    try {
      const response: any = await this.uploadImageToCloudinary(file).toPromise();
      const imageUrl = response.secure_url;
      const docRef = await this.firestore.collection('productos').add({
        name: product.name,
        price: product.price,
        category: product.category,
        image: imageUrl,
        status: product.status,
      });
      console.log('Producto agregado con ID:', docRef.id);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  }

  // Actualizar un producto en Firestore
  async updateProduct(product: Product): Promise<void> {
    try {
      await this.firestore.collection('productos').doc(product.id).update({
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
        status: product.status,
      });
      console.log('Producto actualizado');
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  }
}
