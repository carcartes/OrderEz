import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
  standalone: false
})
export class CardPage {
  constructor(private navCtrl: NavController) {}

  goBack() {
    this.navCtrl.back();
  }
}
