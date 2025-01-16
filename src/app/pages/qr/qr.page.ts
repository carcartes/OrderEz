import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { CarritoService } from '../../services/carrito.service'; // Asegúrate de importar el servicio
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
  standalone: false
})
export class QrPage implements OnInit {
  isSupported = false;
  scanning: boolean = false;

  constructor(
    private carritoService: CarritoService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    // Verifica si el dispositivo soporta el escáner de código de barras
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    this.scanning = true;
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }

    try {
      // Redirige a la página de escaneo
      this.router.navigate(['/camera']);
    } catch (error) {
      console.error('Error al redirigir:', error);
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Para usar la aplicación, autoriza los permisos de cámara.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Nueva función para asignar la mesa predeterminada
  assignDefaultTable(): void {
    const mesaId = 'iRg1YdX4xMkbtLIDlBBC'; // ID de la mesa predeterminada
    this.carritoService.agregarMesaAlCarrito(mesaId); // Asigna la mesa al carrito
    this.router.navigate(['/home']); // Redirige al home
  }
}
