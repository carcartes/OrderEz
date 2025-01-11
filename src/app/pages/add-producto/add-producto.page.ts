import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.page.html',
  styleUrls: ['./add-producto.page.scss'],
  standalone: false
})
export class AddProductoPage {
  constructor(private router: Router) {}

  // Redirige a la página de catálogo
  goToCatalogo() {
    this.router.navigate(['/catalogo']);
  }
}
