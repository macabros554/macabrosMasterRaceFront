import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { ListaPedidos } from '../../interfaces/listaPedidos.interfce';
import Swal from 'sweetalert2';
import { Language } from '../../../../../../../../../VSCode2/DEC/trimestre1/Angular/practica3Paises (mostrarErrores)/src/app/pais/interfaces/interface-global';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit,OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();

  pedidos!:ListaPedidos[];
  pedidosDefinitivos:ListaPedidos[]=[];
  discos1TB!:ListaPedidos[];
  proIntel!:ListaPedidos[];
  proAMD!:ListaPedidos[];
  pedidoEspera:boolean=false;


  constructor(private http:HttpClient,private serviceUsuario:UsuarioService,private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4,
      language:{
        url:"http://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
      }
    };
    this.sacarPedidos();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  /**
   * metodo para sacar todos los pedidos del usuario
   */

  sacarPedidos(){
    this.serviceUsuario.buscarPedidos()
    .subscribe({
      next: (resp => {
        this.pedidos=resp;
        this.sacarOrdenadores();

    }),
      error: resp => {
        //Swal.fire('No tiene pedidos',resp.error.mensaje)
      }
  });
  }

  /**
   * metodo para asignar a cada pedido su ordenador
   */

  sacarOrdenadores(){
    let contador:number=0;
    this.pedidos.forEach(pedido => {
      this.serviceUsuario.buscarOrdenador(pedido.id)
      .subscribe({
        next: (resp => {
          this.pedidos[contador].ordenador=resp;
          contador++;
          if (contador==this.pedidos.length) {
            this.dtTrigger.next(null);
            this.tipos();
          }
      }),
        error: resp => {
          Swal.fire('No tiene ordenadores asociados a un pedido',resp.error.mensaje)
        }
      });
    });
  }

  tipos(){

    this.discos1TB = this.pedidos.filter(i => i.ordenador.discoduro.capacidad == "1TB");
    this.proIntel = this.pedidos.filter(i => i.ordenador.procesador.marca == "AMD");
    this.proAMD = this.pedidos.filter(i => i.ordenador.procesador.marca == "Intel");
    this.pedidosDefinitivos=this.pedidos;
    this.pedidoEspera=true;
  }


}
