import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {ProductoComponent} from './producto/producto.component';
import {ProductoService} from './producto/productoService';

@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ProductoService],
  bootstrap: [AppComponent, ProductoComponent]
})
export class AppModule { }
