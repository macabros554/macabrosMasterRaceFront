import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ordenadores } from '../../paginas/interfaces/ordenadores.interface';
import { Pedido } from '../../paginas-protegidas/interfaces/pedido.interface';
import { AuthResponse } from '../../auth/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ComprarService {
  private baseUrl: string = environment.baseUrl;
  constructor( private http: HttpClient) { }

  comprar(pedido:Pedido){
    const url = `${this.baseUrl}/pedido`;
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.post<AuthResponse>(url,pedido,{headers});
  }

}
