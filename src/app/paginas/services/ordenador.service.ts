import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ordenadores } from '../interfaces/ordenadores.interface';

@Injectable({
  providedIn: 'root'
})

export class OrdenadorService {
  private baseUrl: string = environment.baseUrl;
  constructor( private http: HttpClient) { }
  ordenadorCaja!:Ordenadores;

  sacarOrdenadores():Observable<Ordenadores[]>{
    const url = `${this.baseUrl}/ordenador/listaOrdenadores`;
    const header = new HttpHeaders();
    return this.http.get<Ordenadores[]>(url,{headers:header});
  }

  sacarUnOrdenador(id:string):Observable<Ordenadores>{
    const url = `${this.baseUrl}/ordenador/${id}`;
    const header = new HttpHeaders();
    return this.http.get<Ordenadores>(url,{headers:header});
  }

  recibirOrdenador(ordenador:Ordenadores){
    this.ordenadorCaja=ordenador;
    //console.log(ordenador);
  }
}
