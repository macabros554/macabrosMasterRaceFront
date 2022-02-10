import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resumen-compra',
  templateUrl: './resumen-compra.component.html',
  styleUrls: ['./resumen-compra.component.css']
})
export class ResumenCompraComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.checkToken()
  }

  checkToken(){
    this.authService.validarToken()
    .subscribe({
      next: () => console.log('Token válido'),
      error: resp => {
        console.log(resp.error.message);
        this.router.navigateByUrl('/login')

      }
    }
    )
  }

}
