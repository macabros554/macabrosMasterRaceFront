import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../interfaces/usuario.interface';
import { ListaPedidos, Ordenador } from '../interfaces/listaPedidos.interfce';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent implements OnInit {

  constructor(private serviceUsuario:UsuarioService,private router: Router) { }

  ngOnInit(): void {
    this.sacarUsuario();
  }

  pago:boolean=false;
  espera:boolean=false;
  esperaOrdenador:boolean=false;
  usuario!:Usuario;
  pedidos:ListaPedidos[]=[];
  ordenadores:Ordenador[]=[];
  pedido:boolean=false;

  mostrarTipoPago(){
    this.pago=true;
  }

  ocultarTipoPago(){
    this.pago=false;
  }

  sacarUsuario(){
    this.serviceUsuario.buscarUsuario()
    .subscribe({
        next: (resp => {
          this.usuario=resp;
          this.espera=true;
          this.sacarPedidos();
      }),
        error: resp => {
          //console.log(resp);
          Swal.fire('Usuario indispuesto',resp.error.mensaje)
        }
    });
  }

  sacarPedidos(){
    this.serviceUsuario.buscarPedidos()
    .subscribe({
      next: (resp => {
        this.pedidos=resp;
        this.sacarOrdenadores();

    }),
      error: resp => {
        //console.log(resp);
        //Swal.fire('No tiene pedidos',resp.error.mensaje)
      }
  });
  }

  sacarOrdenadores(){

    let contador:number=0;
    this.pedidos.forEach(pedido => {

      this.serviceUsuario.buscarOrdenador(pedido.id)
      .subscribe({
        next: (resp => {

          this.ordenadores.push(resp);
          this.pedidos[contador].ordenador=resp;
          contador++;
          this.pedido=true;
      }),
        error: resp => {

        }
    });

    });

  }

  borrarPedido(id:number){
    this.serviceUsuario.borrarPedido(`${id}`)
    .subscribe({
      next: (resp => {
        console.log(resp);
    }),
      error: resp => {
        console.log(resp);
        Swal.fire('No tiene pedidos',resp.error.mensaje)
      }
  });
  }
}
