import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage {
  nombre: string = 'Juan Pérez';
  correo: string = 'juan.perez@example.com';

  constructor() {}
}
