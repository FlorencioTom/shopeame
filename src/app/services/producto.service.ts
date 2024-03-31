import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {
  
  private baseUrl = 'https://my-json-server.typicode.com/franlindebl/shopeame-api-v2/products';
  private httpClient = inject(HttpClient);

  nuevosProds:Producto[] = [];

  getAll(){
    return firstValueFrom(
      this.httpClient.get<Producto[]>(this.baseUrl /*, this.createHeaders()*/)
    )
  }

  updateById(id:string, producto:Producto){
    return firstValueFrom(
      this.httpClient.put<Producto>(`${this.baseUrl}/${id}`, producto )
    )
    /*this.nuevosProds = this.nuevosProds.filter( (prod) => {
      if(id == prod.id){
        prod = producto;
      }
      return true;
    }); */
  }

  create(producto:Producto){
    this.nuevosProds.push(producto);
    //
    return this.nuevosProds;
  }

  getMyProds():Producto[] {
    //this.nuevosProds.= 1;
    return this.nuevosProds;
  }

}
