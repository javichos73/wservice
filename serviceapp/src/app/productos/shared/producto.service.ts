/**
 * Created by José Martinez on 24/5/2017.
 */
import {DomSanitizer} from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import {Http, Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Producto} from './producto';
import {appService} from '../../shared/config';

import 'rxjs/add/operator/toPromise';

let sanitizer: DomSanitizer;

@Injectable()
export class ProductoService {
  numeroItems = 0;
  paginaActual = 1;
  paginaAnterior: string;
  public paginaSiguiente: string;

  constructor(private _http: Http, private sanit: DomSanitizer) {
    sanitizer = this.sanit;
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
    const errorMsg = error.message + 'No se pudo obtener los datos';
    console.error(errorMsg);
    return Promise.reject(error.message || error);
  }

  mapProductos(res: any): Producto[] {
    return res.map(toProducto);
  }
}

  function toProducto(r: any): Producto {
    let imag = r.imagen;
    if (imag === null) {
      imag = appService.media + 'generico.jpg';
    }
    imag = sanitizer.bypassSecurityTrustUrl(imag);
    const producto = <Producto>({
      nombre: r.nombre_prod,
      precio: Number.parseFloat(r.precio1_prod),
      cantidad: Number.parseFloat(r.cantidad_prod),
      codigo_barras: r.cod_barras_prod,
      imagen: imag,
      ubicacion: r.ubicacion,
    });
    return producto;
  }

  function mapProducto(response: Response): Producto {
     return toProducto(response.json());
  }
