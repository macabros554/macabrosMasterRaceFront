import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { OrdenadorService } from '../services/ordenador.service';
import Swal from 'sweetalert2';
import { Ordenadores } from '../interfaces/ordenadores.interface';


@Component({
  selector: 'app-ordenadores',
  templateUrl: './ordenadores.component.html',
  styleUrls: ['./ordenadores.component.css']
})
export class OrdenadoresComponent implements OnInit{

  constructor(private http:HttpClient,private ordenadorService:OrdenadorService) { }

  ngOnInit(): void {
    this.buscarOrdenadores();
  }

  espera:boolean=false;

  listaOrdenadores!:Ordenadores[];

  /**
   * metodo que saca la lista de ordenadores de la API y en el momento que los tiene
   * cambia la espera a tru para que se muestren
   */

  buscarOrdenadores() {
    this.ordenadorService.sacarOrdenadores()
    .subscribe({
       next: (resp => {
         this.listaOrdenadores=resp;
         this.espera=true;
      }),
       error: resp => {
         Swal.fire('No se han podido cargar los datos del servidor')
       }
    });
  }

}
