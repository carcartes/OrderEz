import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.page.html',
  styleUrls: ['./edit-perfil.page.scss'],
  standalone: false
})
export class EditPerfilPage implements OnInit {
  firstName: string = '';
  lastName: string = '';
  correo: string = '';
  contrasena: string = '';  // Variable para contraseña
  userId: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Obtener datos del usuario
    this.authService.getUserProfile().subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.authService.getUserData(this.userId).subscribe((userData: any) => {
          this.firstName = userData?.firstName || '';
          this.lastName = userData?.lastName || '';
          this.correo = userData?.email || '';
          // Cargar la contraseña (aunque no se debe mostrar por razones de seguridad)
          // Es mejor manejarla de forma segura sin mostrarla en el formulario
        });
      }
    });
  }

  // Redirige al perfil
  goToProfile() {
    this.router.navigate(['/perfil']);
  }

  // Actualizar perfil
  updateProfile() {
    if (this.userId) {
      const updatedData = {
        firstName: this.firstName,
        lastName: this.lastName,
      };

      // Actualiza los datos en Firestore
      this.authService.updateUserData(this.userId, updatedData).then(() => {
        alert('Perfil actualizado con éxito');
        this.goToProfile();
      }).catch((error) => {
        console.error('Error al actualizar el perfil:', error);
        alert('Error al actualizar el perfil');
      });

      // Solo actualizar la contraseña si fue modificada
      if (this.contrasena) {
        this.authService.updatePassword(this.contrasena).then(() => {
          console.log('Contraseña actualizada con éxito');
        }).catch((error) => {
          console.error('Error al actualizar la contraseña:', error);
        });
      }
    }
  }
}
