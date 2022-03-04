import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListaPedidos } from '../../interfaces/listaPedidos.interfce';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styleUrls: ['./hijo.component.css']
})
export class HijoComponent implements OnInit {

  @Output()
  eventoHijo = new EventEmitter<ListaPedidos>();

  pedidos:ListaPedidos[]=[];
  ultimoPedido!:ListaPedidos;


  constructor(private serviceUsuario:UsuarioService) { }

  ngOnInit(): void {
  }

  /**
   * metodo para enviar el ultimo pedido a la pagina que llame al componente hijo y pulse el boton de enviar
   */

  enviarPadre() {
    this.eventoHijo.emit(this.ultimoPedido);
  }

  /**
   * metodo para sacar todos los pedido del usuario
   */

  sacarPedidos(){
    this.serviceUsuario.buscarPedidos()
    .subscribe({
      next: (resp => {
        this.pedidos=resp;
        this.sacarOrdenadores();
    }),
      error: resp => {
        Swal.fire('No tiene pedidos',resp.error.mensaje)
      }
  });
  }
  /**
   * metodo para sacar el ultimo pedido de la lista de pedidos del usuario
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
            this.ultimoPedido=this.pedidos[contador-1];
            this.enviarPadre();
          }
      }),
        error: resp => {
          Swal.fire('No tiene ordenadores asociados a un pedido',resp.error.mensaje)
        }
    });
    });
  }
}
