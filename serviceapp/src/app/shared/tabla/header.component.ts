import {Component, Input, OnInit, OnChanges, SimpleChange} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';
import {tablaConf} from './../config';

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() titulo = '';
  @Input() numeroItems: number;
  @Input() paginaActual: number;
  totalPaginas: number;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: { [propKey: string ]: SimpleChange }) {
    this.actualizarPaginacion();
  }

  actualizarPaginacion() {
    this.totalPaginas = Math.ceil(this.numeroItems / tablaConf.itemsPorPagina);
  }
}
