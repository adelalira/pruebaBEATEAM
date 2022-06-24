import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pedido } from '../interfaces/interfaz';

@Injectable({
  providedIn: 'root'
})
export class BEATEAMserviceService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = environment.baseUrl; 




  recogerPedidos(token:string){
    const url = `${this.baseUrl}`;

    const opcion = new HttpHeaders().set('X-Auth',token).set('funcion','getTareas');
    opcion.append('Content-Type', 'application/json')
    
    return this.http.get<Pedido[]>(url, { headers: opcion });
  }


}
