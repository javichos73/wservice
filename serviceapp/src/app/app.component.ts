import {Component} from '@angular/core';

import {HttpModule} from '@angular/http';
import {ProductoService} from './productos/shared/producto.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductoService, HttpModule]
})
export class AppComponent {
  titulo = 'Informacion de productos';

  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'ic_menu',
      sanitizer.bypassSecurityTrustResourceUrl('assets/ic_menu_white_24px.svg'));
  }
}
