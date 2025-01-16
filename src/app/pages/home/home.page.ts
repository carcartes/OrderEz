import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Importar ToastController

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  pizzas: Product[] = [];
  pastas: Product[] = [];
  appetizers: Product[] = [];

  constructor(
    private carritoService: CarritoService,
    private router: Router,
    private toastController: ToastController // Inyectar ToastController
  ) {}

  ngOnInit() {
    this.loadPizzas();
    this.loadPastas();
    this.loadAppetizers();
  }

  loadPizzas() {
    this.carritoService.getProductsByCategory('Pizzas').subscribe(
      (data: Product[]) => {
        this.pizzas = data;
      },
      error => {
        console.error('Error al cargar las pizzas:', error);
      }
    );
  }

  loadPastas() {
    this.carritoService.getProductsByCategory('Pastas').subscribe(
      (data: Product[]) => {
        this.pastas = data;
      },
      error => {
        console.error('Error al cargar las pastas:', error);
      }
    );
  }

  loadAppetizers() {
    this.carritoService.getProductsByCategory('Appetizers').subscribe(
      (data: Product[]) => {
        this.appetizers = data;
      },
      error => {
        console.error('Error al cargar los appetizers:', error);
      }
    );
  }

  async agregarAlCarrito(product: Product) {
    this.carritoService.agregarAlCarrito(product);

    // Mostrar Toast de "Agregado con éxito"
    const toast = await this.toastController.create({
      message: 'Agregado con éxito',
      duration: 1000, // Duración en milisegundos
      position: 'bottom',
      color: 'light', // Color del Toast
    });

    await toast.present();
  }

  navigateToCategory(category: string) {
    this.router.navigate(['/categoria', category]);
  }
}
