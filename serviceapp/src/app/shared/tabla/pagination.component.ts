import {Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChange} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';
import {tablaConf} from './../config';

@Component({
  selector: 'app-paginador',
  templateUrl: './pagination-component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
  numeroItemsPorPagina: number;
  numerosPaginas = [];
  totalPaginas: number;
  @Input() pagina_actual: number;
  @Input() numero_items: number;
  // @Input() query: string;
  @Output() cambiar = new EventEmitter();
  @Output() siguiente = new EventEmitter();
  @Output() anterior = new EventEmitter();
  @Output() numero = new EventEmitter();

  /**
   * Creates an instance of Pagination.
   *
   * @param {ResourceService} resource
   *
   * @memberOf Pagination
   */
  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    this.numeroItemsPorPagina = tablaConf.itemsPorPagina;
    //this.numero_items = 0;
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
  }

  ngOnInit() {
    this.actualizarPaginacion();
  }

  ngOnChanges(changes: { [propKey: string ]: SimpleChange }) {
    this.actualizarPaginacion();
  }

  actualizarPaginacion() {
    // actualizar paginas

    this.numerosPaginas = [];
    this.totalPaginas = Math.ceil(this.numero_items / this.numeroItemsPorPagina);
    this.numerosPaginas = Array(this.totalPaginas).fill(this.totalPaginas, 0).map((_, i) => i + 1);
  }

  cambiarPagina(numero) {
    this.pagina_actual = numero;
    this.cambiar.emit({pagina: numero});
  }

  cambiarPaginaAnterior() {
    this.cambiarPagina(this.pagina_actual - 1);
  }

  cambiarPaginaSiguiente() {
    this.cambiarPagina(this.pagina_actual + 1);
  }
}
