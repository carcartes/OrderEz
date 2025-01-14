import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';

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
    private router: Router
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

  agregarAlCarrito(product: Product) {
    this.carritoService.agregarAlCarrito(product);
  }

  navigateToCategory(category: string) {
    this.router.navigate(['/categoria', category]);
  }
}
