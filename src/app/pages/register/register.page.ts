import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router // Inyectamos el servicio Router
  ) {}

  // Método para manejar el registro
  async onRegister() {
    if (this.password !== this.confirmPassword) {
      this.showToast('Las contraseñas no coinciden.', 'warning');
      return;
    }

    try {
      await this.authService.register(this.email, this.password, this.firstName, this.lastName);
      this.showToast('Registro exitoso. Ahora puedes iniciar sesión.', 'dark');

      // Redirigir al usuario al login después de 1 segundo (opcional para que vea el toast)
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1000);
    } catch (error: any) {
      this.showToast(`Error al registrarse: ${error.message}`, 'danger');
    }
  }

  // Método para mostrar un Toast dinámico
  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom',
    });
    await toast.present();
  }
}
