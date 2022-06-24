import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import * as crypto from 'crypto-js';
import { BEATEAMserviceService } from './servicio/beateam.service';
import { Pedido } from './interfaces/interfaz';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'pruebaBEATEAM';

  constructor(private servicio: BEATEAMserviceService){}

  ngOnInit(): void {
    this.crearToken();
    this.recogerPedidos();
  }

  //VARIABLES
  pedidos: Pedido[] = [];
  token!:string;

  first = 0;
  rows = 10;

  datos:boolean=false;


  /**
   * Creamos el token dinamico y lo encriptamos para pasarlo en las peticiones.
   */
  crearToken(){
    let partePrivada:string="ADELLIRA";
    let fechaActual = new Date();
    this.token = crypto.SHA384(partePrivada + String(fechaActual.getFullYear()) + String(fechaActual.getMonth() + 1).padStart(2,'0') + String(fechaActual.getDate()).padStart(2,'0') ).toString();
  }



  /**
   * Recoge todos los pedidos de la base de datos
   */
  recogerPedidos(){
    this.servicio.recogerPedidos(this.token).subscribe({
      next: (resp) => {
        this.pedidos = resp;
        console.log(this.pedidos)
        this.datos=true;
      },
      error: (e) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'En estos momentos no podemos mostrarle los pedidos, perdone por las molestias.',
          confirmButtonColor: '##52ab98',
        });
      },
    });
    

 }



  /**
     * Tabla
     */
   next() {
    this.first = this.first + this.rows;
}

  prev() {
      this.first = this.first - this.rows;
  }

  reset() {
      this.first = 0;
  }

  isLastPage(): boolean {
      return this.pedidos ? this.first === (this.pedidos.length - this.rows): true;
  }

  isFirstPage(): boolean {
      return this.pedidos ? this.first === 0 : true;
  }



  




  
}
