/**
 * Created by Jose Martinez on 30/5/2017.
 */
import {DomSanitizer} from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import {Component, OnInit} from '@angular/core';
import {Producto} from '../productos/shared/producto';
import {ProductoService} from '../productos/shared/producto.service';
import {CarritoService} from './shared/carrito.service';
import {DetalleCompra} from './shared/detalle-compra';

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

  // constructor(private productoService: ProductoService) { }
  constructor(private carritoService: CarritoService, iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
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

  /*
   buscar(event: string) {
   this.productoService
   .buscarProductos(event)
   .subscribe(productos => this.productos = productos);
   console.log("busqueda " + typeof(this.productos));
   }


   totalCompra(): number {
   let total = 0;
   for (const detalle of this.compra){
   total += detalle.subtotal;
   }
   return total;
   }
   */
  totalCompra() {
    let total = 0;
    this.compra.forEach(detalle => total += detalle.subtotal);
    return total;
  }

  /*
   agregarProducto(producto: Producto) {
   const detalle = <DetalleCompra>({
   cantidad: 1,
   subtotal: producto.precio,
   producto: producto,
   });
   this.compra.push(detalle);
   }
   */
  eliminarDetalle(detalle: any) {
    this.compra.splice(detalle, 1);
  }

  activarPanel() {
    /* console.log('iniciando compra');
     this.buscar('ajino');
     for ( const prod of this.productos) {
     this.agregarProducto(prod);
     }
     console.log('agregados ' + this.productos.length);
     */
    this.isActivo = !this.isActivo;

  }

  upQuantity(detalle: DetalleCompra) {
    if (detalle.cantidad < detalle.producto.cantidad && detalle.producto.cantidad != 0)
      detalle.cantidad++;
    this.calcular(detalle);
  }

  downQuantity(detalle: DetalleCompra) {
    if (detalle.cantidad != 0)
      detalle.cantidad--;
    this.calcular(detalle);
  }

  verificarCantidad(detalle: DetalleCompra) {
    if (detalle.cantidad > detalle.producto.cantidad) {
      alert("No hay suficientes productos en stock");
      detalle.cantidad = detalle.producto.cantidad;
    }
    if (detalle.cantidad < 0) {
      alert("No se pueden encargar cantidades negativos ");
      detalle.cantidad = 1;
    }
    this.calcular(detalle);
  }

  calcular(detalle: DetalleCompra) {
    detalle.subtotal = detalle.cantidad * detalle.producto.precio;
  }

}
