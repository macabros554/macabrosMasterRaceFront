import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  /**
   * formulario template-driven
   */


  email!: string;
  password!: string;

  login() {
    this.authService.login( this.email, this.password )
    .subscribe({
       next: (resp => {
         //console.log(resp);
         localStorage.setItem('token',resp.access_token!);
         this.router.navigateByUrl('/paginas/ordenadores');
      }),
       error: resp => {
         //console.log(resp);

         Swal.fire('Usuario o contraseña invalido/s', resp.error.message, 'error')
       }
    });
  }

}
