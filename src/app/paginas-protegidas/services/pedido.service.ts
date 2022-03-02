import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pedido } from '../../paginas-protegidas/interfaces/pedido.interface';
import { Ordenador } from '../interfaces/ordenador.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private baseUrl: string = environment.baseUrl;
  constructor( private http: HttpClient) { }

  buscarPedio(id:string){
    const url = `${this.baseUrl}/pedido/`+id;
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<Pedido>(url,{headers});
  }

  buscarOrdenador(id:string){
    const url = `${this.baseUrl}/pedido/${id}/ordenadornuevo`;
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<Ordenador>(url,{headers});
  }

}
