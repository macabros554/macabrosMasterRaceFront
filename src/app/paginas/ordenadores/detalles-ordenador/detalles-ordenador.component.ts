import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fuente, Grafica, Ordenadores, Discoduro, RAM } from '../../interfaces/ordenadores.interface';
import { OrdenadorService } from '../../services/ordenador.service';
import Swal from 'sweetalert2';
import { ComponentesService } from '../../services/componentes.service';
import { Procesadores } from '../../interfaces/procesador.interface';



@Component({
  selector: 'app-detalles-ordenador',
  templateUrl: './detalles-ordenador.component.html',
  styleUrls: ['./detalles-ordenador.component.css']
})
export class DetallesOrdenadorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private serviceOrdenador:OrdenadorService, private servicioComponentes:ComponentesService) { }

  espera:boolean=false;
  ordenador!:Ordenadores;
  procesadores!:Procesadores[];
  rams!:RAM[];
  discos!:Discoduro[];
  graficas!:Grafica[];
  fuentes!:Fuente[];
  id:string="";

  ngOnInit(): void {
    this.buscarOrdenador();
  }

  buscarOrdenador(){
    this.serviceOrdenador.sacarUnOrdenador(this.route.snapshot.paramMap.get('id')!).subscribe({
      next: (resp => {
        this.ordenador=resp;

        this.buscarProcesadores();

     }),
      error: resp => {
        Swal.fire('No se han podido cargar los datos del servidor')
      }
   });
  }

  buscarProcesadores(){
    this.servicioComponentes.sacarProcesadoresCompatibles(this.ordenador.procesador.id).subscribe({
      next: (resp => {
        this.procesadores=resp;
        this.buscarRam();
     }),
      error: resp => {
        Swal.fire('No se han podido cargar los procesadores')
      }
   });
  }

  buscarRam(){
    this.servicioComponentes.sacarRamsCompatibles(this.ordenador.ram.id).subscribe({
      next: (resp => {
        this.rams=resp;
        this.buscarDiscos();
     }),
      error: resp => {
        Swal.fire('No se han podido cargar las RAM')
      }
   });
  }

  buscarDiscos(){
    this.servicioComponentes.sacarDiscos(this.ordenador.discoduro.id).subscribe({
      next: (resp => {
        this.discos=resp;
        this.buscarGraficas();
     }),
      error: resp => {
        console.log(resp);
        Swal.fire('No se han podido cargar los discos')
      }
   });
  }

  buscarGraficas(){
    this.servicioComponentes.sacarGraficas(this.ordenador.grafica.id).subscribe({
      next: (resp => {
        this.graficas=resp;
        this.buscarFuentes();
     }),
      error: resp => {
        console.log(resp);
        Swal.fire('No se han podido cargar las graficas')
      }
   });
  }

  buscarFuentes(){
    this.servicioComponentes.sacarFuentes(this.ordenador.fuente.id).subscribe({
      next: (resp => {
        this.fuentes=resp;
        this.espera=true;
     }),
      error: resp => {
        console.log(resp);
        Swal.fire('No se han podido cargar las fuentes')
      }
   });
  }

}
