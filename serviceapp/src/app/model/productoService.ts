/**
 * Created by usuario on 24/5/2017.
 */
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Producto} from './producto';
import {appService} from '../server';

@Injectable()
export class ProductoService {
  private Producto;

  constructor(private _http: Http) {
  }

  getAll(): Observable<Producto[]> {
    const producto$ = this._http
      .get(appService.ws_producto ) //, {headers:this.getHeaders()})
      .map(mapProductos)
      .catch(handleError);
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
    const producto$ = this._http
      .get(`${appService.ws_producto}/${codigo_barras}`) // , {headers: this.getHeaders()})
      .map(mapProducto)
      .catch(handleError);
      return producto$;
  }
/*
  save(model: Producto) : Observable<Response>{
    // this won't actually work because the StarWars API doesn't
    // is read-only. But it would look like this:
    return this
      .http
      .put(`${this.baseUrl}/people/${person.id}`,
            JSON.stringify(person),
            {headers: this.getHeaders()});
  }
*/
}


function mapProductos(response: Response): Producto[]{
  // throw new Error('ups! Force choke!');

  // The response of the API has a results
  // property with the actual results
  console.log(toProducto(response.json()[0]));
  return response.json().map(toProducto) ;
}

function toProducto(r: any): Producto{
  const producto = <Producto>({
    // id: extractId(r),
    // url: r.url,
    nombre: r.nombre_prod,
    precio: Number.parseFloat(r.precio1_prod),
    cantidad: Number.parseFloat(r.cantidad_prod),
    codigo_barras: r.cod_barras_prod,
  });
  console.log('Parsed model:', producto);
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

// this could also be a private method of the component class
function handleError (error: any) {
  // log error
  // could be something more sofisticated
  let errorMsg = error.message + 'Yikes! There was a problem with our hyperdrive device and we couldn t retrieve your data!'
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}
