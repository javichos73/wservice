import { Component } from '@angular/core';

import {HttpModule} from '@angular/http';
import {ProductoService} from './model/productoService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductoService, HttpModule]
})
export class AppComponent {
  title = 'Pagina inicial !';
}
