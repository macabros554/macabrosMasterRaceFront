import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pedido } from '../../paginas-protegidas/interfaces/pedido.interface';
import { Ordenador } from '../interfaces/ordenador.interface';



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
    return this.http.post<Pedido>(url,pedido,{headers});
  }


  comprarOrdenador(ordenador:Ordenador,id:number){
    const url = `${this.baseUrl}/pedido/${id}/ordenadornuevo`;
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.post<Ordenador>(url,ordenador,{headers});
  }

}
