import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Pedido, Ordenador } from '../interfaces/pedido.interface';
import { OrdenadorService } from '../../paginas/services/ordenador.service';

@Component({
  selector: 'app-datos-compra',
  templateUrl: './datos-compra.component.html',
  styleUrls: ['./datos-compra.component.css']
})
export class DatosCompraComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    email: ['', [ Validators.required, Validators.email ]],
    direccion: ['', [ Validators.required, Validators.minLength(4) ]],
    telefono: ['', [ Validators.required, Validators.min(600000000),Validators.max(999999999) ]],
    tipoPago: ['', [ Validators.required, Validators.minLength(3) ]],
    codigo: ['', [ Validators.required,Validators.min(100),Validators.max(999) ]],
    tarjeta: ['', [ Validators.required, Validators.min(1000000000000000),Validators.max(9000000000000000) ]],
    duenioTarjeta: ['', [ Validators.required, Validators.minLength(4) ]],
    ordenador:[this.ordenadorGuardado]
  });

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private serviceOrdenador: OrdenadorService) { }

  ngOnInit(): void {

  }

get ordenadorGuardado(){
  return this.serviceOrdenador.ordenadorCaja;
}

comprar() {
  const user = this.miFormulario.value;

  this.authService.comprar(user)
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



campoEsValido( campo: string ) {

  return this.miFormulario.controls[campo].errors
          && this.miFormulario.controls[campo].touched;
}
}
