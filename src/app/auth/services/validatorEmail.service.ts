import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/interfaces';
import { usuario } from '../interfaces/usuario';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorEmailService {

  private baseUrl: string = environment.baseUrl;
  constructor( private http: HttpClient) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null>{
    const email = control.value;
    return this.comprobarEmail(email).pipe(
      map (resp => {
        if(resp != null){
           return {laVerdad: true};
        }else{
         return null;
        }
      }),
      catchError (err => {
         return of(null);
      })
    );

  }
  comprobarEmail(email:string):Observable<AuthResponse>{
    const url = `${ this.baseUrl }/auth/email/${email}`;
    const header = new HttpHeaders()
    header.append('Access-Control-Allow-Origin','*');
    return this.http.get<AuthResponse>( url, {headers:header})
  }
}
