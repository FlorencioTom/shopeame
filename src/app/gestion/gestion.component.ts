import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Producto } from '../interfaces/producto.interface';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent {

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  productoService = inject(ProductoService);
  formBuilder: FormBuilder = inject(FormBuilder);
  formulario: FormGroup;
  arrProductos:Producto[] = [];
  selectedProd:Producto[] = [];
  idSlected:string = '';
  

  constructor(){
    this.formulario = this.formBuilder.group({
      id:[],
      name:[],
      price: [],
      description: [],
      image:[],
      stars:[]
    })
  }

  async ngOnInit(){
    this.activatedRoute.params.subscribe(async params => {
      if(params['id'] != undefined){
        this.idSlected = params['id'];
        const response = await this.productoService.getAll();
        this.arrProductos = response;
  
        this.selectedProd = this.arrProductos.filter( (prod) => {
          return prod.id == params['id'];
        });

        console.log(this.selectedProd);

        this.formulario = this.formBuilder.group({
          id: this.selectedProd[0].id,
          name: this.selectedProd[0].name,
          price: this.selectedProd[0].price,
          description: this.selectedProd[0].description,
          image:this.selectedProd[0].image,
          stars:this.selectedProd[0].stars
        });
      }


    });
  }

  async onSubmit(){
    if(this.idSlected != ''){
      //console.log('Se va a actualizar',this.formulario.value);
      const res = await this.productoService.updateById(this.idSlected, this.formulario.value);
      console.log(res);   
    }else{
      console.log(this.formulario.value);
      this.productoService.create(this.formulario.value);
      this.router.navigateByUrl(`/productos`);       
    }

  }

}
