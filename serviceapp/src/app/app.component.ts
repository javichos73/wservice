import { Component } from '@angular/core';

import {HttpModule} from '@angular/http';
import {ProductoService} from './productos/shared/producto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductoService, HttpModule]
})
export class AppComponent {
  titulo = 'MiCompra Informacion de productos';
}
