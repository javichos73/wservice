/**
 * Created by usuario on 26/5/2017.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';


import {CarritoService} from '../../carrito/shared/carrito.service';
import {ProductoService} from '../shared/producto.service';
import {Producto} from '../shared/producto';

@Component({
  selector: 'app-producto-details',
  templateUrl: './producto-detail.component.html',
  styles: ['./producto-detail.component.css']
})
export class ProductoDetailComponent implements OnInit, OnDestroy {
  producto: Producto;
  sub: any;
  imagen: any;

  constructor(private route: ActivatedRoute,
              private productoService: ProductoService,
              private carritoService: CarritoService,
              private router: Router, iconRegistry: MdIconRegistry,
              private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'ic_ok',
        sanitizer.bypassSecurityTrustResourceUrl('assets/ic_check_black_24px.svg'));
    iconRegistry.addSvgIcon(
        'ic_error',
        sanitizer.bypassSecurityTrustResourceUrl('assets/ic_clear_black_24px.svg'));
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['codigo_barras'];
      this.productoService
        .get(id)
        .subscribe(p => this.producto = p);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoProductoList() {
    const link = ['/productos'];
    this.router.navigate(link);
  }

  agregarACarrito(producto: Producto) {
    this.carritoService.agregarProducto(producto);
    const link = ['/carrito'];
    this.router.navigate(link);
    // producto.stock -= producto.quantity;
  }
}
