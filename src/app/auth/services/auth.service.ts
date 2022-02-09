import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, ErrorResponse } from '../interfaces/interfaces';
import { usuario, usuariolog } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  constructor( private http: HttpClient) { }

  login(email:string, password: string){
    const url = `${this.baseUrl}/login`;
    const body =  {
      "email":email,
      "password": password};
    const header = new HttpHeaders();
    header.append('Access-Control-Allow-Origin','*');
    return this.http.post<AuthResponse>(url, body,{headers:header});
  }

  registrar(user:usuario){
    const url = `${this.baseUrl}/auth/register`;
    return this.http.post<AuthResponse>(url, user);
  }

  validarToken():Observable<AuthResponse>{
    const url = `${ this.baseUrl }/products`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '' );

    return this.http.get<AuthResponse>( url, { headers } )

    console.log('validar toke');
  }
}
