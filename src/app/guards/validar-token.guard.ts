import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of, tap } from "rxjs";
import { AuthResponse } from "src/app/auth/interfaces/interfaces";
import Swal from "sweetalert2";
import { AuthService } from "../auth/services/auth.service";





@Injectable({
    providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate {
    constructor( private authService: AuthService,
        private router: Router ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean>| any {
        let access=false;
        console.log('Can activate');

        return this.authService.validarToken()
        .pipe(
            map( resp => {
              console.log(resp);

              return true
            }),
            catchError( err => {
                console.log(err);
                Swal.fire('Error',err.error.message,'error');

                this.router.navigateByUrl('/auth/login');
                return of(false)
            })
          )
          this.router.navigateByUrl
          return false
        // .subscribe({
        //     next: (resp) => {
        //         access=true;},
        //     error: (resp) => {
        //         access=false;

        //         //this.router.navigateByUrl('/auth/login')
        //            }
        //         });
        //         return access;
    }

}
