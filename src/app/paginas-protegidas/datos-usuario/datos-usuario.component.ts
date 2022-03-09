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

  constructor(private serviceUsuario:UsuarioService) { }

  ngOnInit(): void {
    this.sacarUsuario();
  }

  pago:boolean=false;
  espera:boolean=false;
  usuario!:Usuario;
  pedidos:ListaPedidos[]=[];
  pedidoEspera:boolean=false;
  mensajeHijo!:ListaPedidos;
  outprint:boolean=false;

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
        this.pedidos=[];
        this.pedidoEspera=false;
      }
  });
  }

  sacarOrdenadores(){

    let contador:number=0;
    this.pedidos.forEach(pedido => {

      this.serviceUsuario.buscarOrdenador(pedido.id)
      .subscribe({
        next: (resp => {
          this.pedidos[contador].ordenador=resp;
          contador++;
          if (contador==this.pedidos.length) {
            this.pedidoEspera=true;
          }
      }),
        error: resp => {
          Swal.fire('No tiene ordenadores asociados a un pedido',resp.error.mensaje)
        }
    });

    });

  }
/// que no recarge la pagina
  borrarPedido(id:number){
    this.serviceUsuario.borrarPedido(`${id}`)
    .subscribe({
      next: (resp => {
        this.sacarPedidos();
    }),
      error: resp => {
        Swal.fire('No tiene pedidos',resp.error.mensaje)
      }
  });
  }


  onMensajeHijo(mensaje:ListaPedidos) {
    this.mensajeHijo=mensaje;
    if (this.outprint==true) {
      this.outprint=false;
    }else{
      this.outprint=true;
    }
   }

}
