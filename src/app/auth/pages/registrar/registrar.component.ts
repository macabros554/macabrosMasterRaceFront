import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styles: [
  ]
})
export class RegistrarComponent implements OnInit {

  /**
   * Formulario reactive-form
   */

  miFormulario: FormGroup = this.fb.group({
    name:    ['bruno', [ Validators.required, Validators.minLength(4) ]],
    email:    ['bruno@email.com', [ Validators.required, Validators.email ]],
    calle: ['C/ bruno', [ Validators.required, Validators.minLength(4) ]],
    telefono: ['222444888', [ Validators.required, Validators.minLength(9), Validators.maxLength(9) ]],
    password: ['bruno', [ Validators.required, Validators.minLength(4) ]],
  });

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  registrar() {
    const { name, email, calle, telefono, password } = this.miFormulario.value;

    this.authService.registrar( name, email, calle, telefono, password )
    .subscribe({
       next: (resp => {

         console.log(resp);
         this.router.navigateByUrl('/');
      }),
       error: resp => {
         console.log(resp);

         Swal.fire('Error', resp.error.message, 'error')
       }
    });
  }

  campoEsValido( campo: string ) {

    return this.miFormulario.controls[campo].errors
            && this.miFormulario.controls[campo].touched;
  }

}
