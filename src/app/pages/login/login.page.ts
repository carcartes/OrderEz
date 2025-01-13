import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  // Método para manejar el inicio de sesión
  async onLogin() {
    if (this.email && this.password) {
      await this.authService.login(this.email, this.password);
    } else {
      alert('Por favor, completa todos los campos');
    }
  }
}
