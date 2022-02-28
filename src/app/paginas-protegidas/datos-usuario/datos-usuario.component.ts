import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../interfaces/usuario.interface';
import { ListaPedidos } from '../interfaces/listaPedidos.interfce';

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
  usuario!:Usuario;
  pedidos!:ListaPedidos[];
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
        this.pedido=true;
    }),
      error: resp => {
        //console.log(resp);
        //Swal.fire('No tiene pedidos',resp.error.mensaje)
      }
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
