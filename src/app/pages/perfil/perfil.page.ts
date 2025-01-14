import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {
  firstName: string = '';
  lastName: string = '';
  correo: string = '';
  userId: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUserProfile().subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.authService.getUserData(this.userId).subscribe((userData: any) => {
          this.firstName = userData?.firstName || '';
          this.lastName = userData?.lastName || '';
          this.correo = userData?.email || '';
        });
      }
    });
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout().then(() => {
      console.log('Sesión cerrada');
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
