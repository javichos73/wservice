/**
 * Created by Jose Martinez on 30/5/2017.
 */
import {DomSanitizer} from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import {Component, OnInit} from '@angular/core';
import {Producto} from '../productos/shared/producto';
import {CarritoService} from './shared/carrito.service';
import {DetalleCompra} from './shared/detalle-compra';
import {MdDialog, MdDialogRef} from '@angular/material';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  compra: DetalleCompra[] = [];
  errorMessage = '';
  isActivo = false;
  productos: Producto[] = [];

  constructor(private carritoService: CarritoService, iconRegistry: MdIconRegistry,
              sanitizer: DomSanitizer, public dialog: MdDialog) {
    iconRegistry.addSvgIcon(
        'ic_delete',
        sanitizer.bypassSecurityTrustResourceUrl('assets/ic_delete.svg'));
    iconRegistry.addSvgIcon(
        'ic_mas',
        sanitizer.bypassSecurityTrustResourceUrl('assets/ic_add_circle_outline_black_18px.svg'));
    iconRegistry.addSvgIcon(
        'ic_menos',
        sanitizer.bypassSecurityTrustResourceUrl('assets/ic_remove_circle_outline_black_18px.svg'));
  }

  ngOnInit() {
    this.carritoService.items.subscribe(data => {
      this.compra = data;
    });
  }

  totalCompra() {
    let total = 0;
    this.compra.forEach(detalle => total += detalle.subtotal);
    return total;
  }

  eliminarDetalle(detalle: any) {
    const i = this.compra.indexOf( detalle );
    i !== -1 && this.compra.splice( i, 1 );
  }

  upQuantity(detalle: DetalleCompra) {
    if (detalle.cantidad < detalle.producto.cantidad && detalle.producto.cantidad != 0) {
      detalle.cantidad++;
      this.calcular(detalle);
    }
  }

  downQuantity(detalle: DetalleCompra) {
    if (detalle.cantidad != 0) {
      detalle.cantidad--;
      this.calcular(detalle);
    }
  }

  verificarCantidad(detalle: DetalleCompra) {
    if (detalle.cantidad > detalle.producto.cantidad) {
      alert('No hay suficientes productos en stock');
      detalle.cantidad = detalle.producto.cantidad;
    }
    if (detalle.cantidad < 0) {
      alert('No se pueden encargar cantidades negativos');
      detalle.cantidad = 1;
    }
    this.calcular(detalle);
  }

  calcular(detalle: DetalleCompra) {
    detalle.subtotal = detalle.cantidad * detalle.producto.precio;
  }

  descartarLista() {
    const dialogRef = this.dialog.open(CarritoDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === 'True') {
        this.compra = [];
        this.carritoService.descartarLista();
      }
    });
  }
}


@Component({
  selector: 'carrito-dialog',
  template: `<h1 md-dialog-title>Confirmacion</h1>
<div md-dialog-content>Esta seguro de descartar la lista?</div>
<div md-dialog-actions>
  <button md-button md-dialog-close="True">Aceptar</button>
  <button md-button md-dialog-close="False">Cancelar</button>
</div>`,
})
export class CarritoDialog {
  constructor(public dialogRef: MdDialogRef<CarritoDialog>) {}
}
