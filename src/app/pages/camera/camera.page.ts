import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { CarritoService } from '../../services/carrito.service'; // Asegúrate de importar el servicio
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
  standalone: false
})
export class CameraPage implements OnInit {
  scanning: boolean = false;

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit() {
    this.scan();  // Inicia la cámara automáticamente cuando se acceda a esta página
  }

  async scan(): Promise<void> {
    this.scanning = true;
    const granted = await this.requestPermissions();
    if (!granted) {
      console.error("Permiso de cámara denegado");
      return;
    }

    try {
      // Comienza el escaneo del código QR
      const listener = await BarcodeScanner.addListener(
        'barcodeScanned',
        async (result) => {
          const mesaId = result.barcode.rawValue; // Obtener el valor escaneado del QR
          console.log('Mesa ID escaneado:', mesaId);

          // Llama al servicio para agregar el ID de la mesa al carrito
          this.carritoService.agregarMesaAlCarrito(mesaId);

          // Detiene el escáner después de escanear el código
          await BarcodeScanner.removeAllListeners();

          // Detener el escaneo de la cámara
          await BarcodeScanner.stopScan();

          // Redirige al home o a la página deseada después de escanear
          this.router.navigate(['/home']);
        }
      );
      // Inicia el escaneo
      await BarcodeScanner.startScan();
    } catch (error) {
      console.error('Error al escanear:', error);
    } finally {
      this.scanning = false;
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }
}
