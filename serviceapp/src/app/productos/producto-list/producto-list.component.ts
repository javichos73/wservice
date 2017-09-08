/**
 * Created by Jose Martinez on 26/5/2017.
 */

import {MdSnackBar } from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {Component, OnInit} from '@angular/core';
import {Producto} from '../shared/producto';
import {ProductoService} from '../shared/producto.service';
import {CarritoService} from '../../carrito/shared/carrito.service';
import {Subject} from 'rxjs/Subject';
import {MdIconRegistry} from '@angular/material';
import {tablaConf} from './../../shared/config';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.scss'],

})

export class ProductoListComponent implements OnInit {
  nombreProducto = '';
  productos: Producto[] = [];
  errorMessage = '';
  isLoading = true;
  seleccionado: 'Agregar';
  tabla = false;
  code$ = new Subject<any>();
  // para tabla
  numeroItems : number;
  paginaActual :  number;
  paginaAnterior: string;
  paginaSiguiente: string;
  numerosPaginas = [];
  totalPaginas = 0;
  numeroItemsPorPagina: number;

  constructor(private productoService: ProductoService, private cartService: CarritoService,
              iconRegistry: MdIconRegistry, sanitizer: DomSanitizer
                         , public snackBar: MdSnackBar
  ) {
    this.paginaActual = 1;
    this.numeroItems = 0;
    iconRegistry.addSvgIcon(
        'ic_anterior',
        sanitizer.bypassSecurityTrustResourceUrl('assets/ic_navigate_before_black_18px.svg'));
    iconRegistry.addSvgIcon(
        'ic_siguiente',
        sanitizer.bypassSecurityTrustResourceUrl('assets/ic_navigate_next_black_18px.svg'));
    iconRegistry.addSvgIcon(
        'ic_primera_pag',
        sanitizer.bypassSecurityTrustResourceUrl('assets/ic_first_page_black_18px.svg'));
    iconRegistry.addSvgIcon(
        'ic_ultima_pag',
        sanitizer.bypassSecurityTrustResourceUrl('assets/ic_last_page_black_18px.svg'));
  iconRegistry.addSvgIcon(
        'ic_compra',
        sanitizer.bypassSecurityTrustResourceUrl('assets/ic_add_shopping_cart_black_24px.svg'));
    iconRegistry.addSvgIcon(
          'ic_error',
          sanitizer.bypassSecurityTrustResourceUrl('assets/ic_delete_forever_black_24px.svg'));
    iconRegistry.addSvgIcon(
        'ic_disponible',
        sanitizer.bypassSecurityTrustResourceUrl('assets/ic_check_black_24px.svg'));
    iconRegistry.addSvgIcon(
        'ic_no_disponible',
        sanitizer.bypassSecurityTrustResourceUrl('assets/ic_clear_black_24px.svg'));
  }

  ngOnInit() {
    this.numeroItemsPorPagina = tablaConf.itemsPorPagina;
  }

  buscarProducto() {
     this.productoService.buscarNombre(this.nombreProducto, this.paginaActual)
        .subscribe(
          res => {
            this.isLoading = false;
            this.tabla = true;
            this.paginaSiguiente = res.next;
            this.paginaAnterior = res.previous;
            this.numeroItems = res.count;
            this.numerosPaginas = [];
            this.totalPaginas = Math.ceil(this.numeroItems / this.numeroItemsPorPagina);
            this.numerosPaginas = Array(this.totalPaginas).fill(this.totalPaginas, 0).map((_, i) => i + 1);
            this.productos = this.productoService.mapProductos(res.results);
          },
          err => {
            this.isLoading = false;
            this.errorMessage = `Error! ${err.json().error}`;
          }
        );
  }

  onChange(pagina = 1) {
    if (this.nombreProducto !== '') {
     this.paginaActual = pagina;
    // this.code$.next(this.nombreProducto);
      this.isLoading = true;
      this.buscarProducto();
    }else {
     this.productos = [];
     //this.isLoading = false;
    }
  }

  agregarACarrito(producto: Producto) {
    let mensaje = this.cartService.agregarProducto(producto);
    let snackBarRef = this.snackBar.open(mensaje, 'Deshacer', {duration: 2000, });
    snackBarRef.onAction().subscribe(null, null, () => {
      this.snackBar.open('Realizado..', '', {duration: 500, });
    });
  }
/*
  recibido(event): void {
    console.log('recibido evento ');
    console.log(event);
  }
  sliderEv(event): void {
    console.log('recibido evento slider ');
    console.log(event);
  }

  cambiarPagina(numero) {
   this.paginaActual = numero;
   this.onChange(this.paginaActual);
  }

  cambiarPaginaAnterior() {
    this.cambiarPagina(this.paginaActual - 1);
  }

   cambiarPaginaSiguiente() {
    this.cambiarPagina(this.paginaActual + 1);
  }
*/
  productoEnCarrito(prod: Producto): boolean {
    if (this.cartService.productoEnCarrito(prod) == null) {
      return false;
    }
    return true;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 2000, });
  }
}
