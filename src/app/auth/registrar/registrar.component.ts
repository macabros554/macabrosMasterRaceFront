import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  /**
   * formulario reactivo
   */

  miFormulario: FormGroup = this.fb.group({
    name:    ['', [ Validators.required, Validators.minLength(4) ]],
    email:    ['', [ Validators.required, Validators.email ]],
    calle: ['', [ Validators.required, Validators.minLength(4) ]],
    telefono: ['', [ Validators.required, Validators.min(600000000), Validators.max(999999999) ]],
    password: ['', [ Validators.required, Validators.minLength(4) ]],
  });

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  /**
   * metodo para enviar el formulario
   */

  registrar() {
    const user = this.miFormulario.value;

    this.authService.registrar(user)
    .subscribe({
       next: (resp => {
         this.router.navigateByUrl('/');
      }),
       error: resp => {
         Swal.fire('Email en uso')
       }
    });
  }

  /**
   * metodo para validar que cada campo sea valido
   * @param campo
   * @returns
   */

  campoEsValido( campo: string ) {

    return this.miFormulario.controls[campo].errors
            && this.miFormulario.controls[campo].touched;
  }
}


