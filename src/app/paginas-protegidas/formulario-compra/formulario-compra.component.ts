import { Component, OnInit } from '@angular/core';
import { OrdenadorService } from '../../paginas/services/ordenador.service';
import { ComprarService } from '../services/comprar.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-compra',
  templateUrl: './formulario-compra.component.html',
  styleUrls: ['./formulario-compra.component.css']
})
export class FormularioCompraComponent implements OnInit {

  constructor(private serviceOrdenador: OrdenadorService,private serviceComprar: ComprarService, private router: Router, private fb: FormBuilder) { }

  miFormulario: FormGroup = this.fb.group({
    direccion:    ['', [ Validators.required, Validators.minLength(4) ]],
    telefono:    ['', [ Validators.required, Validators.min(600000000), Validators.max(999999999) ]],
    correoElectronico:    ['', [ Validators.required, Validators.email ]],
    tipopago: ['', [ Validators.required]],
    codigotarjeta: ['', [ Validators.required, Validators.min(100), Validators.max(999) ]],
    tarjeta: ['', [ Validators.required, Validators.min(1000000000000000), Validators.max(9999999999999999) ]],
    dueniotarjeta: ['', [ Validators.required, Validators.minLength(4) ]],
  });

  get ordenadorGuardado(){
    return this.serviceOrdenador.ordenadorCaja;
  }

  ngOnInit(): void {
  }
  /**
   * metodo para enviar el pedido y si el pedido se crea envia el ordenador para asociar el ordenador al pedido
   */

  comprar() {
    const pedido = this.miFormulario.value;
    this.serviceComprar.comprar(pedido)
    .subscribe({
        next: (resp => {
          let id:number=resp.id;

          this.serviceComprar.comprarOrdenador(this.ordenadorGuardado,resp.id).subscribe({
            next: resp => {
              this.router.navigateByUrl('/paginasProtegidas/datos-compra/resumenCompra/'+id);
            },error :resp =>{
              Swal.fire('Ordenador no enviado')
            }
          });
      }),
        error: resp => {
          //console.log(resp);
          Swal.fire('Rellena todos los tados',resp.error.mensaje)
        }
    });
  }

  campoEsValido( campo: string ) {

    return this.miFormulario.controls[campo].errors
            && this.miFormulario.controls[campo].touched;
  }
}
