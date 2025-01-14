import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onRegister() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Registrar los campos por separado (firstName y lastName)
    this.authService
      .register(this.email, this.password, this.firstName, this.lastName)
      .then(() => {
        console.log('Usuario registrado con éxito');
      })
      .catch((error) => {
        alert('Error al registrarse: ' + error.message);
      });
  }
}
