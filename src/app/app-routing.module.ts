import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },

  {
    path: 'mis-pedidos',
    loadChildren: () => import('./pages/mis-pedidos/mis-pedidos.module').then( m => m.MisPedidosPageModule)
  },
  {
    path: 'qr',
    loadChildren: () => import('./pages/qr/qr.module').then( m => m.QrPageModule)
  },

  {
    path: 'buscar',
    loadChildren: () => import('./pages/buscar/buscar.module').then( m => m.BuscarPageModule)
  },
  {
    path: 'categoria/:name',
    loadChildren: () => import('./pages/categoria/categoria.module').then( m => m.CategoriaPageModule)
  },
  {
    path: 'producto/:id',
    loadChildren: () => import('./pages/producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'card',
    loadChildren: () => import('./pages/card/card.module').then( m => m.CardPageModule)
  },
  {
    path: 'catalogo',
    loadChildren: () => import('./pages/catalogo/catalogo.module').then( m => m.CatalogoPageModule)
  },
  {
    path: 'pedidos-adm',
    loadChildren: () => import('./pages/pedidos-adm/pedidos-adm.module').then( m => m.PedidosAdmPageModule)
  },
  {
    path: 'mesa',
    loadChildren: () => import('./pages/mesa/mesa.module').then( m => m.MesaPageModule)
  },
  {
    path: 'edit-producto/:id',
    loadChildren: () => import('./pages/edit-producto/edit-producto.module').then( m => m.EditProductoPageModule)
  },
  {
    path: 'add-producto',
    loadChildren: () => import('./pages/add-producto/add-producto.module').then( m => m.AddProductoPageModule)
  },
  {
    path: 'edit-perfil',
    loadChildren: () => import('./pages/edit-perfil/edit-perfil.module').then( m => m.EditPerfilPageModule)
  },
  {
    path: 'contra',
    loadChildren: () => import('./pages/contra/contra.module').then( m => m.ContraPageModule)
  },
  {
    path: 'detalle-pedido',
    loadChildren: () => import('./pages/detalle-pedido/detalle-pedido.module').then( m => m.DetallePedidoPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
