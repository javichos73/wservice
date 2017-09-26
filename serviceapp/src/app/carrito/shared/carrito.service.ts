/**
 * Created by Jose Martinez on 31/5/2017.
 */
import {Injectable} from '@angular/core';

import {DetalleCompra} from './detalle-compra';
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

  /*
   Metodo para ser llamado desde diferentes vistas
   y permite agregar un producto al carrito verificando el stock
   */
  agregarProducto(producto: Producto): string {
    let detalle = this.productoEnCarrito(producto);
    let mensaje = null;
    if (producto.cantidad > 0) {
      if (detalle == null) {
        detalle = <DetalleCompra>({
          cantidad: 1,
          subtotal: producto.precio,
          producto: producto,
        });
        this._items.push(detalle);
        mensaje = 'Producto agregado';
      } else if (detalle.cantidad < producto.cantidad) {
        detalle.cantidad++;
        mensaje = 'Agregada 1 unidad';

      } else {
        mensaje = 'No hay stock suficiente1 ';
        return mensaje;
      }
    } else {
      mensaje = 'No hay stock suficiente2 ';
      return mensaje;
    }
    this._itemsSubject.next(this._items);
    return mensaje;
  }

  getTotal() {
    let total = 0;
    return this._items.forEach(detalle => total += detalle.subtotal);
  }

  getItems() {
    return this._items;
  }

  productoEnCarrito(prod: Producto): DetalleCompra {
    for (const det of this._items) {
      if (det.producto.codigo_barras == prod.codigo_barras) {
        return det;
      }
    }
    return null;
  }

  descartarLista() {
    this._items = [];
  }

  /*
   Metodo para disminuir unidades en caso de deshacer
   el agregar un producto en la vista lista de productos.
   */
  disminuirProducto(prod: Producto) {
    const det = this.productoEnCarrito(prod);
    if (det != null) {
      if (det.cantidad > 1) {
        det.cantidad--;
      } else {
        const i = this._items.indexOf(det);
        i !== -1 && this._items.splice(i, 1);
      }
    }
  }
}
