/**
 * Created by Jose Martinez on 31/5/2017.
 */
import {Injectable} from '@angular/core';

import {DetalleCompra} from './detalleCompra';
import {Producto} from '../../productos/shared/producto';

import 'rxjs/add/operator/map';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class CarritoService {

  private _items: DetalleCompra[] = [];
  private _itemsSubject: BehaviorSubject<DetalleCompra[]> = new BehaviorSubject(this._items);
  public items: Observable<DetalleCompra[]> = this._itemsSubject.asObservable();


  constructor() {
  }

  agregarProducto(producto: Producto) {
    let detalle = this.productoEnCarrito(producto);
    console.log(detalle);
    if (detalle == null) {
      detalle = <DetalleCompra>({
        cantidad: 1,
        subtotal: producto.precio,
        producto: producto,
      });
      this._items.push(detalle);
    } else {
      detalle.cantidad++;
    }
    this._itemsSubject.next(this._items);
  }

  getTotal() {
    let total = 0;
    return this._items.forEach(detalle => total += detalle.subtotal);
  }

  getItems() {
    return this._items;
  }

  productoEnCarrito(prod: Producto): DetalleCompra {
    console.log('se va a comparar');
    for (const det of this._items) {
      if (det.producto.codigo_barras == prod.codigo_barras) {
        return det;
      }
    }
    return null;
  }
}
