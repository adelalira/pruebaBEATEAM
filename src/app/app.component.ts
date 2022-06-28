import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import * as crypto from 'crypto-js';
import { BEATEAMserviceService } from './servicio/beateam.service';
import { Estado, Estados, Pedido, Tipo, Tipos } from './interfaces/interfaz';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'pruebaBEATEAM';

  constructor(private servicio: BEATEAMserviceService, private fb:FormBuilder){};


  ngOnInit(): void {
    this.crearToken();
    this.recogerPedidos();
    this.recogerEstados();
    this.recogerTipos();

 

  }

  //VARIABLES

  pedidos: Pedido[] = [];
  tipos!: Tipo[];
  estados!: Estado[];
  token!:string;
  

  first = 0;
  rows = 10;

  cliente: string = "";
  referencia: string = "";
  usuario:string = "";
  fechaInicio!:Date;
  fechaFin!:Date;
  tipoSeleccionado!:string;
  tiposSeleccionado:string[]=[];
  checkboxSeleccionados : string[]=[];


  /**
   * Creamos el token dinamico y lo encriptamos para pasarlo en las peticiones.
   */
  crearToken(){
    let partePrivada:string="ADELLIRA";
    let fechaActual = new Date();
    this.token = crypto.SHA384(partePrivada + String(fechaActual.getFullYear()) + String(fechaActual.getMonth() + 1).padStart(2,'0') + String(fechaActual.getDate()).padStart(2,'0') ).toString();
  }



  /**
   * Recoge todos los pedidos de la base de datos.
   */
  recogerPedidos(){
    this.servicio.recogerPedidos(this.token).subscribe({
      next: (resp) => {
        this.pedidos = resp.data;
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
 * Recogemos los tipos con la petición getTipos.
 */
 recogerTipos(){
  this.servicio.recogerTipos(this.token).subscribe({
    next: (resp) => {
      this.tipos = resp.data;
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
 * Recogemos los estados con la petición getEstados.
 */
recogerEstados(){
  this.servicio.recogerEstados(this.token).subscribe({
    next: (resp) => {
      this.estados = resp.data;
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

seleccionarTiposIndividualmente(){
  if(this.tipoSeleccionado=="TODOS"){
    this.tiposSeleccionado = ["Mesa","Ruta","Urgente"]
  }
  else if (this.tipoSeleccionado =="Mesa" || this.tipoSeleccionado =="Urgente" || this.tipoSeleccionado =="Ruta") {
    this.tiposSeleccionado.push(this.tipoSeleccionado);
  }
}


/**
 * Seleccionamos los estados que queremos buscar, en el caso de que se haga un segundo click se eliminara del array de elementos con los que se hara la busqueda.
 * @param estado 
 */
seleccionarEstados(estado:Estado){
  let existe:boolean=false;
 for (let i = 0; i < this.checkboxSeleccionados.length; i++) {
  if(String(estado)===this.checkboxSeleccionados[i]){
    this.checkboxSeleccionados.splice(i,1);
    existe=true;
  }
 }
 if(existe===false){
  this.checkboxSeleccionados.push(String(estado));
 }
}

/**
 * Busca los pedidos con los parametros introducidos en el formulario.
 */
buscar(){
  this.servicio.buscar(this.token, this.cliente, this.usuario, this.referencia, this.fechaInicio, this.fechaFin, this.tiposSeleccionado, this.checkboxSeleccionados)
   .subscribe({
     next: (resp => {
      this.pedidos=resp.data;
    }),
     error: resp => {
       Swal.fire({
         title:'Error',
         icon: 'error',
         text:resp.error.mensaje,
         confirmButtonColor:'#52ab98'
       });
     }
  });
 }

 
  /**
     * Metodos propios de primeng necesarios para imprimir la tabla
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
