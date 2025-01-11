import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.page.html',
  styleUrls: ['./edit-producto.page.scss'],
  standalone: false
})
export class EditProductoPage {
  constructor(private router: Router) {}

  // Redirige a la página de catálogo
  goToCatalogo() {
    this.router.navigate(['/catalogo']);
  }
}
