import {Component, OnInit} from '@angular/core';
import {BarcodeValidatorService} from '../shared/barcode-validator.service';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import {Producto} from '../../productos/shared/producto';
import {ProductoService} from '../../productos/shared/producto.service';
import {CarritoService} from '../../carrito/shared/carrito.service';
import {MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-instant-search',
  templateUrl: './instant-search.component.html'
})
export class InstantSearchComponent implements OnInit {

  spinner: boolean;
  message: string;
  producto: Producto;
  codigo: string;

  code$ = new Subject<any>();

  constructor(private barcodeValidator: BarcodeValidatorService,
              private cartService: CarritoService,
              private productoService: ProductoService, public snackBar: MdSnackBar) {
  }

  ngOnInit() {
  }

  onChange() {
    this.buscarProducto();
  }
  agregarACarrito(producto: Producto) {
    const mensaje = this.cartService.agregarProducto(producto);
    const snackBarRef = this.snackBar.open(mensaje, 'Deshacer', {duration: 2000, });
    snackBarRef.onAction().subscribe(null, null, () => {
      this.cartService.disminuirProducto(producto);
      this.snackBar.open('Realizado..', '', {duration: 500, });
    });
  }

  buscarProducto() {
    this.productoService.get(this.codigo)
      .subscribe(
        res => {
          this.producto = res;
          this.message = ``;
        },
        err => {
          this.producto = null;
          this.message = `Producto no encontrado`;
        }
      );
  }
}
