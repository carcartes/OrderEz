import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosAdmPageRoutingModule } from './pedidos-adm-routing.module';

import { PedidosAdmPage } from './pedidos-adm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosAdmPageRoutingModule
  ],
  declarations: [PedidosAdmPage]
})
export class PedidosAdmPageModule {}
