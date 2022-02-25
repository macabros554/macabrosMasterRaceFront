import { Component, OnInit } from '@angular/core';
import { OrdenadorService } from '../../paginas/services/ordenador.service';
import { Pedido } from '../interfaces/pedido.interface';
import { ComprarService } from '../services/comprar.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-compra',
  templateUrl: './formulario-compra.component.html',
  styleUrls: ['./formulario-compra.component.css']
})
export class FormularioCompraComponent implements OnInit {

  constructor(private serviceOrdenador: OrdenadorService,private serviceComprar: ComprarService, private router: Router) { }

  email!: string;

  elPedido:Pedido={
    fechaPack:         new Date(),
    direccion:         "",
    telefono:          "",
    correoElectronico: "",
    tipopado:          "",
    codigotarjeta:     "",
    tarjeta:           "",
    dueniotarjeta:     "",
    id:                1,
    ordenador:         this.ordenadorGuardado

  }

  get ordenadorGuardado(){
    return this.serviceOrdenador.ordenadorCaja;
  }

  ngOnInit(): void {
  }

  comprar() {

    this.serviceComprar.comprar(this.elPedido)
    .subscribe({
        next: (resp => {
          this.router.navigateByUrl('/paginasProtegidas/datos-compra/resumen-compra');
      }),
        error: resp => {
          console.log(resp);
          Swal.fire('Rellena todos los tados')
        }
    });
  }

}
