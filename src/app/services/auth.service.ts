import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';  // Importar Observable
import { map } from 'rxjs/operators';  // Importar el operador map


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  login(email: string, password: string): Promise<boolean> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const userId = userCredential.user?.uid;
        if (userId) {
          return this.firestore
            .collection('carritos')
            .doc(userId)
            .get()
            .toPromise()
            .then((doc) => {
              if (doc && !doc.exists) {
                // Crear un nuevo documento de carrito si no existe
                return this.firestore.collection('carritos').doc(userId).set({
                  userId: userId,
                  products: [], // Carrito vacío inicialmente
                }).then(() => true); // Indicar éxito
              }
              return true; // Si el carrito ya existe
            });
        } else {
          return Promise.reject(new Error('No se pudo obtener el UID del usuario'));
        }
      })
      .then(() => {
        console.log('Inicio de sesión exitoso y carrito verificado');
        this.router.navigate(['/qr']); // Redirige a la página QR
        return true; // Indicar éxito
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error.message);
        alert('Error: ' + error.message);
        return false; // Indicar fallo
      });
  }
  
  // Método para registrarse
register(email: string, password: string, firstName: string, lastName: string): Promise<void> {
  return this.afAuth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const userId = userCredential.user?.uid;
      if (userId) {
        return this.firestore
          .collection('users')
          .doc(userId)
          .set({
            firstName: firstName,
            lastName: lastName,
            email: email,
            createdAt: new Date().toISOString(),
          })
          .then(() => {
            return this.firestore.collection('carritos').doc(userId).set({
              userId: userId,
              products: [],
            });
          });
      } else {
        throw new Error('No se pudo obtener el UID del usuario');
      }
    })
    .catch((error) => {
      console.error('Error al registrarse:', error.message);
      throw error; // Se propaga el error para manejarlo en el componente
    });
}

  
   // Obtener datos del usuario actual
   getUserProfile() {
    return this.afAuth.authState; // Observable del estado de autenticación
  }

  getUserData(uid: string) {
    return this.firestore.collection('users').doc(uid).valueChanges(); // Observable de datos del usuario
  }

  getUserId(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      map(user => user ? user.uid : null)
    );
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
