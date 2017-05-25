/**
 * Created by usuario on 24/5/2017.
 */
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Producto} from './producto';

@Injectable()
export class ProductoService {
  private Producto;
  private url= 'http://localhost:8000/api/producto/';

  constructor(private _http: Http) {

  }

  obtenerProducto(): Observable<Producto> {
    return this._http.get(this.url + '111')
      .map(res => (<Response>res).json());
  }
}
