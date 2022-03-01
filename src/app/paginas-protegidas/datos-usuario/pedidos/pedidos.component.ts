import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { ListaPedidos } from '../../interfaces/listaPedidos.interfce';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit,OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  data:any;

  pedidos!:ListaPedidos[];
  pedido:boolean=false;


  constructor(private http:HttpClient,private serviceUsuario:UsuarioService,private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8
    };
    this.http.get('http://dummy.restapiexample.com/api/v1/employees')
    .subscribe((res:any)=>{
        this.data=res.data;
        this.dtTrigger.next(null);
    }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
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

}
