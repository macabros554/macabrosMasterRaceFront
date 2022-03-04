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

  /**
   * Saca la lista de ordenadores de la API
   * @returns
   */

  sacarOrdenadores():Observable<Ordenadores[]>{
    const url = `${this.baseUrl}/ordenador/listaOrdenadores`;
    const header = new HttpHeaders();
    return this.http.get<Ordenadores[]>(url,{headers:header});
  }

  /**
   * saca el ordenador que le pidas de la API
   * @param id
   * @returns
   */

  sacarUnOrdenador(id:string):Observable<Ordenadores>{
    const url = `${this.baseUrl}/ordenador/${id}`;
    const header = new HttpHeaders();
    return this.http.get<Ordenadores>(url,{headers:header});
  }

  /**
   * guarda en una variable el ordenador que a configurado el usuario
   * @param ordenador
   */

  recibirOrdenador(ordenador:Ordenadores){
    this.ordenadorCaja=ordenador;
  }
}
