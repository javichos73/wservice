/**
 * Created by usuario on 26/5/2017.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductoListComponent } from './producto-list/producto-list.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';

// Route config let's you map routes to components
const routes: Routes = [
  // map '/productos' to the people list component
  {
    path: 'productos',
    component: ProductoListComponent,
  },
  // map '/persons/:id' to person details component
  {
    path: 'producto-detail/:codigo_barras',
    component: ProductoDetailComponent
  },
  // map '/' to '/producto' as our default route
  {
    path: '',
    redirectTo: '/productos',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
