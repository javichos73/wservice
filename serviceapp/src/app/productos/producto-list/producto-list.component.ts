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
  message: string = 'Snack Bar opened.';
  actionButtonLabel: string = 'Retry';
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 10000;
  addExtraClass: boolean = false;

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
          console.log(res);
          this.productos = res;
        },
        err => {
          this.isLoading = false;
          this.message = `An Error! ${err.json().error}`;
        }
      );
  }

//  buscar(nombre: any) {
  //   nombre = nombre.trim();
  //  if (nombre.length > 2) {
//      this.productoService
//        .buscarPorNombres(nombre)
//        .subscribe(
//          /* happy path */ p => this.productos = p,
//          /* error path */ e => this.errorMessage = e,
//          /* onCompleted */ () => this.isLoading = false);
//    }
//  }

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


  /*
   openSnackBar(message: string, action: string) {
   this.snackBar.open("total Productos: " + this.cartService.getItems().length, "Total:" + this.cartService.getTotal(),{ duration: 2000,});
   }
   */

}
