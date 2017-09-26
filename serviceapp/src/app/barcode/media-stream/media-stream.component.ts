import { Router } from '@angular/router';
import {Component, OnInit, OnDestroy, ViewChild, AfterContentInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {BarcodeDecoderService} from '../shared/barcode-decoder.service';
import {BarcodeValidatorService} from '../shared/barcode-validator.service';
import {Producto} from '../../productos/shared/producto';
import {ProductoService} from '../../productos/shared/producto.service';
import {CarritoService} from '../../carrito/shared/carrito.service';
import * as moment from "moment";
import _date = moment.unitOfTime._date;


@Component({
  selector: 'app-media-stream',
  templateUrl: './media-stream.component.html',
  styleUrls: ['./media-stream.component.scss']
})
export class MediaStreamComponent implements OnInit, OnDestroy, AfterContentInit {
  producto : Producto;
  lastResult: any;
  message: any;
  error: any;
  vez = 0;
  code$ = new Subject<any>();

  @ViewChild('interactive') interactive;

  constructor(private decoderService: BarcodeDecoderService,
              private productoService: ProductoService,
              private cartService: CarritoService,
              private barcodeValidator: BarcodeValidatorService,
              private router: Router) {
  };

  ngOnInit() {

    this.decoderService.onLiveStreamInit();
    this.decoderService.onDecodeProcessed();
    this.decoderService.onDecodeDetected()
      .then(code => {
        this.lastResult = code;
        this.decoderService.onPlaySound();
        this.code$.next(code);
        // this.buscarProducto();
      })
      .catch((err) => this.error = `Something Wrong: ${err}`);

    this.productoService.buscarPorCodigo(this.code$)
      .subscribe(
        res => {
          this.producto = res;
          const link = ['/producto/detail/' + res['codigo_barras']];
          this.router.navigate(link);
        },
        err => {
          this.message = `No se ha encontrado el producto`;
        }
      );
  }

  buscarProducto() {
    this.productoService.get(this.lastResult)
      .subscribe(
        res => {
          this.producto = res;
          // this.decoderService.onDecodeStop();
          // this.agregarACarrito(res);
        },
        err => {
          this.message = `Error! ${err.json().error}`;
        }
      );
  }

  ngAfterContentInit() {
    this.interactive.nativeElement.children[0].style.position = 'absolute';
  }

  ngOnDestroy() {
    this.decoderService.onDecodeStop();
  }

  agregarACarrito(producto: Producto) {
    this.cartService.agregarProducto(producto);
  }
}
