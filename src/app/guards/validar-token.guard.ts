import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of, tap } from "rxjs";
import Swal from "sweetalert2";
import { AuthService } from "../auth/services/auth.service";





@Injectable({
    providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate {

  constructor( private authService: AuthService, private router: Router ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean>| any {
    let access=false;
    console.log('Can activate');

    console.log(this.authService.validarToken())

    return this.authService.validarToken()
    .pipe(
        map( (resp) => {
          console.log(resp);
          console.log("entra en la primera parte")
          return true;
        }),
        catchError( (err) => {
          console.log(err);
          console.log("entra en la segunda parte")
          Swal.fire('Error',err.error.message,'error');

          this.router.navigateByUrl('/auth/login');
          return of(false)
        })
      )
  }

}
