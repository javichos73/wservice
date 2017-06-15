/**
 * Created by Jose Martinez on 26/5/2017.
 */

// import {MdSnackBar } from '@angular/material';
import {Component, OnInit} from '@angular/core';
import {Producto} from '../shared/producto';
import {ProductoService} from '../shared/producto.service';
import {CarritoService} from '../../carrito/shared/carrito.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css'],
})

export class ProductoListComponent implements OnInit {
  productos: Producto[] = [];
  errorMessage = '';
  isLoading = true;
  seleccionado: 'Agregar';
  tabla = false;
  code$ = new Subject<any>();

  constructor(private productoService: ProductoService, private cartService: CarritoService
              //           , public snackBar: MdSnackBar
  ) {
  }

  ngOnInit() {
    this.productoService.buscarPorNombres(this.code$)
      .subscribe(
        res => {
          this.isLoading = false;
          this.tabla = true;
          this.productos = res;
        },
        err => {
          this.isLoading = false;
          this.errorMessage = `Error! ${err.json().error}`;
        }
      );
  }

  onChange() {
    this.isLoading = true;
  }

  agregarACarrito(producto: Producto) {
    /*this.delay(2000).then(() => {this.snackBar.openFromComponent(ProductoListComponent, {
     duration: 2000,
     });
     });
     */
    this.cartService.agregarProducto(producto);
    // this.open2();
    // producto.stock -= producto.quantity;
  }

  delay(ms: number): Promise<string> {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }
}
