import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../interfaces/pedido.interface';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


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

  espera:boolean=false;
  pedido!:Pedido;

  traerPedido(){
    this.sevicePedido.buscarPedio(this.route.snapshot.paramMap.get('id')!)
    .subscribe({
        next: (resp => {
          //console.log(resp);
          this.pedido=resp;
          this.espera=true;
      }),
        error: resp => {
          Swal.fire('El pededido no encontrado',resp.error.mensaje)
        }
    });
  }


}
