import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fuente, Grafica, Ordenadores, Discoduro, RAM } from '../interfaces/ordenadores.interface';
import { Procesadores } from '../interfaces/procesador.interface';

@Injectable({
  providedIn: 'root'
})
export class ComponentesService {
  private baseUrl: string = environment.baseUrl;
  constructor( private http: HttpClient) { }

  sacarProcesadoresCompatibles(id:number):Observable<Procesadores[]>{
    const url = `${this.baseUrl}/componente/procesador/${id}`;
    const header = new HttpHeaders();
    return this.http.get<Procesadores[]>(url,{headers:header});
  }

  sacarRamsCompatibles(id:number):Observable<RAM[]>{
    const url = `${this.baseUrl}/componente/ram/${id}`;
    const header = new HttpHeaders();
    return this.http.get<RAM[]>(url,{headers:header});
  }

  sacarDiscos(id:number):Observable<Discoduro[]>{
    const url = `${this.baseUrl}/componente/discos/${id}`;
    const header = new HttpHeaders();
    return this.http.get<Discoduro[]>(url,{headers:header});
  }

  sacarGraficas(id:number):Observable<Grafica[]>{
    const url = `${this.baseUrl}/componente/graficas/${id}`;
    const header = new HttpHeaders();
    return this.http.get<Grafica[]>(url,{headers:header});
  }

  sacarFuentes(id:number):Observable<Fuente[]>{
    const url = `${this.baseUrl}/componente/fuentes/${id}`;
    const header = new HttpHeaders();
    return this.http.get<Fuente[]>(url,{headers:header});
  }


}