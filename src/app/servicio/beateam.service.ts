import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Datos, Estados, Tipos } from '../interfaces/interfaz';

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
    
    return this.http.get<Datos>(url, { headers: opcion });
  }

  recogerTipos(token:string){
    const url = `${this.baseUrl}`;

    const opcion = new HttpHeaders().set('X-Auth',token).set('funcion','getTipos');
    opcion.append('Content-Type', 'application/json')
    
    return this.http.get<Tipos>(url, { headers: opcion });
  }

  recogerEstados(token:string){
    const url = `${this.baseUrl}`;

    const opcion = new HttpHeaders().set('X-Auth',token).set('funcion','getEstados');
    opcion.append('Content-Type', 'application/json')
    
    return this.http.get<Estados>(url, { headers: opcion });
  }


  buscar(token:string, cliente:string, usuario:string, referencia:string, fechaInicio:Date, fechaFin:Date, tiposSeleccionados:string[], checkboxSeleccionados:string[]){
    let url = `${this.baseUrl}`;
    let contador = 0;
    if(cliente!=null && cliente!=""){
      url = `${url}?cliente=${cliente}`;
      contador=1;
    }
    if(referencia!=null && referencia!="" && contador==1){
      url = `${url}&referencia=${referencia}`;
    } 
    if(referencia!=null  && referencia!="" && contador==0){
      url = `${url}?referencia=${referencia}`;
      contador=1;
    }
    if(usuario!=null  && usuario!="" && contador==1){
      url = `${url}&usuario=${usuario}`;
    } 
    if(usuario!=null  && usuario!="" && contador==0){
      url = `${url}?usuario=${usuario}`;
      contador=1;
      console.log(url)
    }
    if(fechaInicio!=null  && contador==1){
      url = `${url}&inicio=${fechaInicio}`;
    } 
    if(fechaInicio!=null && contador==0){
      url = `${url}?inicio=${fechaInicio}`;
      contador=1;
      console.log(url)
    }
    if(fechaFin!=null  && contador==1){
      url = `${url}&fin=${fechaFin}`;
    } 
    if(fechaFin!=null  && contador==0){
      url = `${url}?fin=${fechaFin}`;
      contador=1;
      console.log(url)
    }
    for (let i = 0; i < tiposSeleccionados.length; i++) {
      if(tiposSeleccionados[i]!=null  && contador==1){
        url = `${url}&tipo=${tiposSeleccionados[i]}`;
        console.log(url)
      }
      if(tiposSeleccionados[i]!=null  && contador==0){
        url = `${url}?tipo=${tiposSeleccionados[i]}`;
        contador=1; 
        console.log(url)
     }
    }
    for (let i = 0; i < checkboxSeleccionados.length; i++) {
      if(checkboxSeleccionados[i]!=null   && contador==1){
        url = `${url}&estado[]=${checkboxSeleccionados[i]}`;
        console.log(url)
      }
      if(checkboxSeleccionados[i]!=null  && contador==0){
        url = `${url}?estado[]=${checkboxSeleccionados[i]}`;
        contador=1; 
        console.log(url)
     }
    }
   

    const opcion = new HttpHeaders().set('X-Auth',token).set('funcion','getTareas');
    opcion.append('Content-Type', 'application/json')
    
    return this.http.get<Datos>(url, { headers: opcion });
  }


}
