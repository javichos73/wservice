import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {ProductoListComponent} from './producto-list/producto-list.component';
import {ProductoDetailComponent} from './producto-detail/producto-detail.component';
//import {ProductoService} from './model/productoService';

import { AppRoutingModule } from './app-routing.module';
import { MinValidatorDirective } from './validadores/min-validator.directive';
import { MaxValidatorDirective } from './validadores/max-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    ProductoListComponent,
    ProductoDetailComponent,
    //ProductoService,
    MinValidatorDirective,
    MaxValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  //providers: [ProductoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
