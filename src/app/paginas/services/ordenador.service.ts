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

  sacarOrdenadores(){
    const url = `${this.baseUrl}/ordenador`;
    const header = new HttpHeaders();
    return this.http.get<Ordenadores[]>(url,{headers:header});
  }
}
