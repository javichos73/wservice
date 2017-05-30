/**
 * Created by usuario on 26/5/2017.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductoService } from '../model/productoService';
import { Producto } from '../model/producto';

@Component({
  selector: 'app-producto-details',
  templateUrl: './producto-detail.component.html',
  styles: []
})
export class ProductoDetailComponent implements OnInit, OnDestroy {
  professions: string[] = ['jedi', 'bounty hunter', 'princess', 'sith lord'];
  producto: Producto;
  sub: any;

  constructor(private route: ActivatedRoute,
              private productoService: ProductoService,
              private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['codigo_barras'];
      console.log('obteniendo model con codigo: ', id);
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

  saveProductoDetails() {
    console.log('saved!!!');
      // this.productoService
       //   .save(this.model)
      //    .subscribe(r => console.log(`saved!!! ${JSON.stringify(this.model)}`));
  }

  /*
  //alternatively use:
  gotoPeoplesList(){
      window.history.back();
  }
  */

}
