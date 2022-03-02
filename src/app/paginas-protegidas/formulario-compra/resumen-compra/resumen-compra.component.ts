import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../interfaces/pedido.interface';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Ordenador } from '../../interfaces/listaPedidos.interfce';


@Component({
  selector: 'app-resumen-compra',
  templateUrl: './resumen-compra.component.html',
  styleUrls: ['./resumen-compra.component.css']
})
export class ResumenCompraComponent implements OnInit {

  constructor(private sevicePedido:PedidoService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.traerPedido();
  }

  esperaPedido:boolean=false;
  esperaOrdenador:boolean=false;
  pedido!:Pedido;
  ordenador!:Ordenador;

  traerPedido(){
    this.sevicePedido.buscarPedio(this.route.snapshot.paramMap.get('id')!)
    .subscribe({
        next: (resp => {

          this.pedido=resp;
          this.esperaPedido=true;
      }),
        error: resp => {
          Swal.fire('El pededido no se a encontrado',resp.error.mensaje)
        }
    });

    this.sevicePedido.buscarOrdenador(this.route.snapshot.paramMap.get('id')!)
    .subscribe({
        next: (resp => {

          this.ordenador=resp;
          this.esperaOrdenador=true;
      }),
        error: resp => {
          Swal.fire('El ordenador no se a encontrado',resp.error.mensaje)
        }
    });
  }


}
