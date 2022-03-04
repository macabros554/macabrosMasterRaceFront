import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'macabrosMasterRaceFront';

  constructor( private router: Router, private validarToken:AuthService ){}

  /**
   * metodo para cerrar la secion del usuario
   * vacia el token y te envia al login
   */

  cerrarSesiopn(){
    localStorage.setItem('token',"");
    this.router.navigateByUrl('/auth/login');
  }

}
