import {Component, OnInit} from '@angular/core';
import {BarcodeValidatorService} from '../shared/barcode-validator.service';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import {Producto} from '../../productos/shared/producto';
import {ProductoService} from '../../productos/shared/producto.service';
import {CarritoService} from '../../carrito/shared/carrito.service';

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
              private productoService: ProductoService) {
  }

  ngOnInit() {
  }

  onChange() {
    this.buscarProducto();
  }
  agregarACarrito(producto: Producto) {
    this.cartService.agregarProducto(producto);
  }

  buscarProducto() {
    this.productoService.get(this.codigo)
      .subscribe(
        res => {
          this.producto = res;
        },
        err => {
          this.producto = null;
          this.message = `Error! ${err.json().error}`;
        }
      );
  }
}
