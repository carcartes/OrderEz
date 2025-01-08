import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage {
  selectedCategory = 'completos';

  completos = [
    { name: 'Italiano', price: 5.99, image: 'assets/italiano.jpg' },
    { name: 'Alemán', price: 6.49, image: 'assets/aleman.jpg' },
    { name: 'Chucrut', price: 5.79, image: 'assets/chucrut.jpg' },
  ];

  bebidas = [
    { name: 'Coca-Cola', price: 1.99, image: 'assets/coca-cola.jpg' },
    { name: 'Fanta', price: 1.89, image: 'assets/fanta.jpg' },
    { name: 'Sprite', price: 1.99, image: 'assets/sprite.jpg' },
  ];

  get selectedProducts() {
    return this.selectedCategory === 'completos' ? this.completos : this.bebidas;
  }

  changeCategory(event: any) {
    this.selectedCategory = event.detail.value;
  }

  simulateScan() {
    document.getElementById('scan-result')!.innerText = 'Mesa escaneada';
  }
}
