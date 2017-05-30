/**
 * Created by usuario on 26/5/2017.
 */
import { Component, OnInit } from '@angular/core';
import { Producto} from '../model/producto';
import { ProductoService} from '../model/productoService';

@Component({
  selector: 'app-producto-list',
  template: `

  <section *ngIf="isLoading && !errorMessage">
  Loading our hyperdrives!!! Retrieving data...
  </section>
  <!-- this is the new syntax for ng-repeat -->
  <ul>
    <li *ngFor="let producto of productos">
      <a [routerLink]="['/producto-detail', producto.codigo_barras]">
        {{producto.nombre}} 
      </a>
    </li>
  </ul>
  <!-- HERE: added this error message -->
  <section *ngIf="errorMessage">
    {{errorMessage}}
  </section>
  `,
  // styleUrls: ['./people-list.component.scss']
})
export class ProductoListComponent implements OnInit {
  productos: Producto[] = [];
  errorMessage: string = "";
  isLoading: boolean = true;

  constructor(private productoService: ProductoService) { }

  ngOnInit(){
    this.productoService
      .getAll()
      .subscribe(
         /* happy path */ p => this.productos = p,
         /* error path */ e => this.errorMessage = e,
         /* onCompleted */ () => this.isLoading = false);
  }

}
