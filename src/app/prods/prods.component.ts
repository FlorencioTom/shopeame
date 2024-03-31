import { Component, inject } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { ProductoService } from '../services/producto.service';
import {  ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prods',
  templateUrl: './prods.component.html',
  styleUrls: ['./prods.component.css']
})
export class ProdsComponent {

  productoService = inject(ProductoService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  //empleadoService: any;

  arrProductos:Producto[] = [];
  nuevos:Producto[] = [];

  async ngOnInit(){
    const response = await this.productoService.getAll();
    this.arrProductos = response;

    const response2 = await this.productoService.getMyProds();
    this.nuevos = response2;
   
    //this.arrMisProds.push(response2);

    console.log(response, response2);
  }

  modificar = (ruta: string) => {
    this.router.navigateByUrl(`/productos/${ruta}`);
  }
  

}
