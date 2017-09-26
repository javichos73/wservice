import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';


// angular-material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdDialogModule, MdInputModule, MdSpinner} from '@angular/material';
import {MdSelectModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdProgressSpinnerModule} from '@angular/material';
import { MdSliderModule } from '@angular/material';
import { MdIconRegistry} from '@angular/material';
import { MdIconModule } from '@angular/material';
import {MdDialog, MdDialogRef} from '@angular/material';
import {MdSnackBarModule } from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MdSidenavModule} from '@angular/material';


// componentes
import { AppComponent } from './app.component';
import {ProductoListComponent} from './productos/producto-list/producto-list.component';
import {ProductoDetailComponent} from './productos/producto-detail/producto-detail.component';
import {CarritoComponent, CarritoDialog} from './carrito/carrito.component';
import { PaginationComponent} from './shared/tabla/pagination.component';
import {HeaderComponent} from './shared/tabla/header.component';
import {SidenavComponent} from './shared/sidenav/sidenav.component';
import {FabMenuComponent} from './shared/fab-menu/fab-menu.component';
// seccion barcode
import {BarcodeComponent} from './barcode/barcode.component';
import {NotFoundComponent} from './shared/not-found/not-found.component';
import {MediaStreamComponent} from './barcode/media-stream/media-stream.component';
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
    SidenavComponent,
    FabMenuComponent,
    NotFoundComponent,
    MinValidatorDirective,
    MaxValidatorDirective,
    // seccion barcode
    MediaStreamComponent,
    InstantSearchComponent,
    PaginationComponent,
    HeaderComponent,
    CarritoDialog,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdInputModule,
    MdSelectModule,
    MdToolbarModule,
    MdButtonModule,
    MdProgressSpinnerModule,
    MdSliderModule,
    MdIconModule,
    MdDialogModule,
    MdSnackBarModule,
    FlexLayoutModule,
    MdSidenavModule,
  ],
  providers: [CarritoService, MdIconRegistry, ],
  bootstrap: [AppComponent],
  entryComponents: [CarritoDialog]
})
export class AppModule { }
