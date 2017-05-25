/**
 * Created by usuario on 24/5/2017.
 */

import {Component, OnInit} from '@angular/core';
import {ProductoService} from './productoService';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html'
  })

export class ProductoComponent implements OnInit {
  private producto;

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.producto = this.productoService.obtenerProducto()
      .subscribe(
        data => {
          this.producto = data;
        },
        error => alert(error),
        () =>
      );
  }


}

