/**
 * Created by usuario on 26/5/2017.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ProductoListComponent} from './productos/producto-list/producto-list.component';
import {ProductoDetailComponent} from './productos/producto-detail/producto-detail.component';
import {CarritoComponent} from './carrito/carrito.component';
import {BarcodeComponent} from './barcode/barcode.component';
import {NotFoundComponent} from './shared/not-found/not-found.component';
import {BARCODE_ROUTE} from './barcode/barcode.route';
// Route config let's you map routes to components
const routes: Routes = [
  // pagina inicial de información de productos.
  {
    path: 'productos',
    component: ProductoListComponent,
  },
  {
    path: 'carrito',
    component: CarritoComponent,
  },
  // detalle del producto
  {
    path: 'producto/detail/:codigo_barras',
    component: ProductoDetailComponent
  },
  // redireccion de ruta
  {
    path: '',
    redirectTo: '/productos',
    pathMatch: 'full'
  },
  {
    path: 'barcode',
    redirectTo: '/barcode/search',
    pathMatch: 'full'
  },
  {
    path: 'barcode',
    component: BarcodeComponent,
    children: BARCODE_ROUTE,
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
