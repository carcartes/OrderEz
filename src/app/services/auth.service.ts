import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  // Método para iniciar sesión
  login(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/qr']); // Redirige a la página QR
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error.message);
        alert('Error: ' + error.message);
      });
  }
}

