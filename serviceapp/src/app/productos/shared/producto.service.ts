/**
 * Created by José Martinez on 24/5/2017.
 */
import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Producto} from './producto';
import {appService} from '../../shared/config';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductoService {

  constructor(private _http: Http) {
  }

  buscarPorCodigo(codes: Observable<any>, debounceMs = 400) {
    return codes
      .debounceTime(debounceMs)
      .distinctUntilChanged()
      .switchMap(code => this.get(code));
  }

  buscarPorNombres(codes: Observable<any>, debounceMs = 500) {
    return codes
      .debounceTime(debounceMs)
      .distinctUntilChanged()
      .switchMap(code => this.buscarNombre(code));
  }


  private buscarNombre(nombres: string): Observable<Producto[]> {
    const producto$ = this._http
      .get(`${appService.ws_producto}?nombre=${nombres}`) // , {headers:this.getHeaders()})
      .map(mapProductos)
      .catch(this.handleError);
      return producto$;
  }

  private getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');
    return headers;
  }

  get(codigo_barras: string): Observable<Producto> {
    return this._http
      .get(`${appService.ws_producto}/${codigo_barras}`) // , {headers: this.getHeaders()})
      .map(mapProducto)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    const errorMsg = error.message + 'No se pudo obtener los datos'
    console.error(errorMsg);
    return Promise.reject(error.message || error);
  }

}

function mapProductos(response: Response): Producto[]{
  // throw new Error('ups! Force choke!');

  // The response of the API has a results
  // property with the actual results
  // console.log(toProducto(response.json()[0]));
  return response.json().map(toProducto) ;
}

function toProducto(r: any): Producto{
  const producto = <Producto>({
    nombre: r.nombre_prod,
    precio: Number.parseFloat(r.precio1_prod),
    cantidad: Number.parseFloat(r.cantidad_prod),
    codigo_barras: r.cod_barras_prod,
  });
  // console.log('Parsed model:', producto);
  return producto;
}

// to avoid breaking the rest of our app
// I extract the id from the person url
/*function extractId(personData:any){
  let extractedId = personData.url.replace('http://swapi.co/api/people/','').replace('/','');
  return parseInt(extractedId);
}*/

function mapProducto(response: Response): Producto{
   // toPerson looks just like in the previous example
   return toProducto(response.json());
}

