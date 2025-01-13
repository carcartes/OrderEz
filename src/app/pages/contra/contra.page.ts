import { Component } from '@angular/core';

@Component({
  selector: 'app-contra',
  templateUrl: './contra.page.html',
  styleUrls: ['./contra.page.scss'],
  standalone: false
})
export class ContraPage {
  correo: string = ''; // Almacena el correo ingresado
  codigo: string = ''; // Almacena el código ingresado
  nuevaContrasena: string = ''; // Almacena la nueva contraseña
  confirmarContrasena: string = ''; // Almacena la confirmación de la contraseña
  mostrarCampoCodigo: boolean = false; // Controla la visibilidad del campo de código
  mostrarCamposContrasena: boolean = false; // Controla la visibilidad de los campos de contraseña
  codigoIngresado: boolean = false; // Controla si se ingresó el código

  // Muestra el campo para ingresar el código al hacer clic en "Enviar código"
  enviarCodigo() {
    this.mostrarCampoCodigo = true;
    console.log('Código enviado al correo:', this.correo);
  }

  // Verifica si se ingresó algo en el campo de código
  onCodigoChange() {
    this.codigoIngresado = this.codigo.trim().length > 3;
    if (this.codigoIngresado) {
      this.mostrarCamposContrasena = true;
    }
  }

  // Cambia la contraseña al hacer clic en el botón
  cambiarContrasena() {
    if (this.nuevaContrasena === this.confirmarContrasena) {
      console.log('Contraseña cambiada con éxito');
      // Redirigir al login después de cambiar la contraseña
      window.location.href = '/'; // O utiliza un router de Angular si lo tienes configurado
    } else {
      alert('Las contraseñas no coinciden. Por favor, verifica.');
    }
  }
}
