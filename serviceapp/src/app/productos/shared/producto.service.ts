/**
 * Created by José Martinez on 24/5/2017.
 */
import { Injectable } from '@angular/core';
import {Http, Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Producto} from './producto';
import {appService, tablaConf} from '../../shared/config';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductoService {
  numeroItems = 0;
  paginaActual = 1;
  paginaAnterior: string;
  public paginaSiguiente: string;

  constructor(private _http: Http) {
  }

  getPaginaSiguiente(): string {
    return this.paginaSiguiente;
  }

  buscarPorCodigo(codes: Observable<any>, debounceMs = 400) {
    return codes
      .debounceTime(debounceMs)
      .distinctUntilChanged()
      .switchMap(code => this.get(code));
  }

  buscarPorNombres(codes: Observable<any>, pagina = 1, debounceMs = 200) {
    return codes
      .debounceTime(debounceMs)
      .distinctUntilChanged()
      .switchMap(code => this.buscarNombre(code, pagina));
  }


  buscarNombre(nombres: string, pagina = 1): Observable<any> {
    this.paginaActual = pagina;
    const parametros: URLSearchParams = new URLSearchParams();
    parametros.set(appService.parametroBuscar, nombres);
    parametros.set(appService.parametroPagina, pagina.toString());
    const options = new RequestOptions({search: parametros});
    const producto$ = this._http
      .get(`${appService.ws_producto}`, options) // , {headers:this.getHeaders()})
      .map(response => response.json())
      .catch(this.handleError);
    return producto$;
  }

  private getHeaders() {
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
  mapProductos(res : any): Producto[] {
    // throw new Error('ups! Force choke!');

    // The response of the API has a results
    // property with the actual results
    // if ( res.length > 1) {
    //this.paginaSiguiente = res.next;
    //this.paginaAnterior = res.previous;
    //this.numeroItems = res.count;
    return res.map(toProducto);
    // }
    // return [];
  }
}

  function toProducto(r: any): Producto{
    const producto = <Producto>({
      nombre: r.nombre_prod,
      precio: Number.parseFloat(r.precio1_prod),
      cantidad: Number.parseFloat(r.cantidad_prod),
      codigo_barras: r.cod_barras_prod,
    });
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



