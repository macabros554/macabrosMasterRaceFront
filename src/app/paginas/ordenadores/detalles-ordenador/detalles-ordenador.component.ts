import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ordenadores } from '../../interfaces/ordenadores.interface';
import { OrdenadorService } from '../../services/ordenador.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detalles-ordenador',
  templateUrl: './detalles-ordenador.component.html',
  styleUrls: ['./detalles-ordenador.component.css']
})
export class DetallesOrdenadorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private serviceOrdenador:OrdenadorService) { }

  espera:boolean=false;
  ordenador!:Ordenadores;
  id:string="";

  ngOnInit(): void {
    this.buscarOrdenador();
  }

  buscarOrdenador(){
    this.serviceOrdenador.sacarUnOrdenador(this.route.snapshot.paramMap.get('id')!).subscribe({
      next: (resp => {
        this.ordenador=resp;
        this.espera=true;
     }),
      error: resp => {
        Swal.fire('No se han podido cargar los datos del servidor')
      }
   });
  }

}
