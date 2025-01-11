import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProductoPageRoutingModule } from './edit-producto-routing.module';

import { EditProductoPage } from './edit-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProductoPageRoutingModule
  ],
  declarations: [EditProductoPage]
})
export class EditProductoPageModule {}
