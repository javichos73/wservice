/**
 * Created by Jose Martinez on 30/5/2017.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Producto} from '../productos/shared/producto';
import {appService} from '../shared/config';
@Injectable()
export class ProductoBusquedaService {

  constructor(private http: Http) {
  }

  search(term: string): Observable<Producto[]> {
    const a = this.http
      .get(`${appService.ws_producto}?nombre=${term}`)
      .map(response => response.json().data as Producto[]);
    console.log('en busqueda::: ' + a[0]);
    return a;
  }
}
