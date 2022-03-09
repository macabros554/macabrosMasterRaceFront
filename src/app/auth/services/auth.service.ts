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
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  constructor( private http: HttpClient) { }

  /**
   * metodo que envia la informacion que deberia ser del login a la API y la recive
   * @param email
   * @param password
   * @returns
   */

  login(email:string, password: string){
    const url = `${this.baseUrl}/auth/login`;
    const body =  {
      "email":email,
      "password": password};
    const header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin','*');
    return this.http.post<AuthResponse>(url, body,{headers:header});
  }

  /**
   * metodo que envia la informacion del formulario de registrar a la api y la recive
   * @param user
   * @returns
   */

  registrar(user:usuario){
    const url = `${this.baseUrl}/auth/register`;
    return this.http.post<AuthResponse>(url, user);
  }

  /**
   * metodo para validar tocken
   * envia el tocken que tiene en el localStorage y si es valido no recive ningun error
   * @returns
   */

  validarToken():Observable<AuthResponse>{
    const url = `${ this.baseUrl }/validarToken`;
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<AuthResponse>( url, {headers})
  }

}
