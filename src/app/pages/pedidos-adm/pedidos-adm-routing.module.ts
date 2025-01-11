import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosAdmPage } from './pedidos-adm.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosAdmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosAdmPageRoutingModule {}
