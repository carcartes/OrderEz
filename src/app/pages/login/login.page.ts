import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  isLoggingIn: boolean = false;

  constructor(private authService: AuthService, private toastController: ToastController) {}

  // Método para manejar el inicio de sesión
  async onLogin() {
    if (!this.email || !this.password) {
      this.showToast('Por favor, completa todos los campos', 'warning');
      return;
    }

    this.isLoggingIn = true;

    try {
      const success = await this.authService.login(this.email, this.password);

      if (success) {
        this.showToast('¡Logueado con éxito!', 'dark');
      } else {
        this.showToast('No se pudo iniciar sesión. Verifica tus credenciales.', 'danger');
      }
    } catch (error) {
      this.showToast('Ocurrió un error al intentar iniciar sesión.', 'danger');
    } finally {
      this.isLoggingIn = false;
    }
  }

  // Método para mostrar un toast dinámico
  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom', // Cambiado a "bottom" para que aparezca en la parte inferior
    });
    await toast.present();
  }
}
