import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
// angular-material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdInputModule} from '@angular/material';
import {MdSelectModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdIconModule} from '@angular/material';

// componentes
import { AppComponent } from './app.component';
import {ProductoListComponent} from './productos/producto-list/producto-list.component';
import {ProductoDetailComponent} from './productos/producto-detail/producto-detail.component';
import {CarritoComponent} from './carrito/carrito.component';
// seccion barcode
import {BarcodeComponent} from './barcode/barcode.component';
import {NotFoundComponent} from './shared/not-found/not-found.component';
import {MediaStreamComponent} from './barcode/media-stream/media-stream.component';
import {InputFieldComponent} from './barcode/input-field/input-field.component';
import {ToolbarComponent} from './shared/toolbar/toolbar.component';
import {SidenavComponent} from './shared/sidenav/sidenav.component';
import {FabMenuComponent} from './shared/fab-menu/fab-menu.component';
import {InstantSearchComponent} from './barcode/instant-search/instant-search.component';
// services
import {CarritoService} from './carrito/shared/carrito.service';

import { AppRoutingModule } from './app-routing.module';
import {MinValidatorDirective} from './shared/validadores/min-validator.directive';
import {MaxValidatorDirective} from './shared/validadores/max-validator.directive';



@NgModule({
  declarations: [
    AppComponent,
    ProductoListComponent,
    ProductoDetailComponent,
    CarritoComponent,
    // ProductoBusquedaComponent,
    BarcodeComponent,
    NotFoundComponent,
    MinValidatorDirective,
    MaxValidatorDirective,
    // seccion barcode
    MediaStreamComponent,
    InputFieldComponent,
    ToolbarComponent,
    SidenavComponent,
    FabMenuComponent,
    InstantSearchComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ButtonsModule.forRoot(),
    BrowserAnimationsModule,
    MdInputModule,
    MdSelectModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,

  ],
  providers: [CarritoService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
