import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  // Método para iniciar sesión
  login(email: string, password: string): Promise<void> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/qr']); // Redirige a la página QR
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error.message);
        alert('Error: ' + error.message);
      });
  }

  // Método para registrarse
  register(email: string, password: string, firstName: string, lastName: string): Promise<void> {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const userId = userCredential.user?.uid; // Obtenemos el UID del usuario registrado
        if (userId) {
          // Guardar los datos adicionales en Firestore con los campos separados
          return this.firestore
            .collection('users')
            .doc(userId)
            .set({
              firstName: firstName,  // Guardamos el nombre
              lastName: lastName,    // Guardamos el apellido
              email: email,
              createdAt: new Date().toISOString(),
            })
            .then(() => {
              console.log('Usuario guardado en la base de datos');
              alert('Registro exitoso. Ahora puedes iniciar sesión.');
            });
        } else {
          throw new Error('No se pudo obtener el UID del usuario');
        }
      })
      .catch((error) => {
        console.error('Error al registrarse:', error.message);
        throw error;
      });
  }
  
  


   // Obtener datos del usuario actual
   getUserProfile() {
    return this.afAuth.authState; // Observable del estado de autenticación
  }

  getUserData(uid: string) {
    return this.firestore.collection('users').doc(uid).valueChanges(); // Observable de datos del usuario
  }

  // Actualizar datos del usuario
  updateUserData(uid: string, data: any) {
    return this.firestore.collection('users').doc(uid).update(data);
  }

  updatePassword(newPassword: string) {
    return this.afAuth.currentUser.then((user) => {
      return user?.updatePassword(newPassword);
    });
  }
  // Método para cerrar sesión
  logout(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/']);  // Redirige al usuario a la página de inicio después de cerrar sesión
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  }
  
}
