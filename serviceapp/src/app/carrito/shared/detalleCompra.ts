/**
 * Created by Jose Martinez on 30/5/2017.
 */
import {Producto} from '../../productos/shared/producto';

export interface DetalleCompra {
  cantidad: number;
  subtotal: number;
  producto: Producto;
}
