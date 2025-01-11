import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.page.html',
  styleUrls: ['./edit-perfil.page.scss'],
  standalone: false
})
export class EditPerfilPage {
  constructor(private router: Router) {}

  // Redirige a la página de inicio
  goToHome() {
    this.router.navigate(['/perfil']);
  }
}
