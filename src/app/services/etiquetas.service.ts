import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etiquetas } from '../models/etiquetas';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class EtiquetasService {

  //private apiEtiquetas:string = "http://localhost:8080/api/etiquetas";
  private apiEtiquetas:string = "http://192.168.1.10:8082/api/etiquetas";

  constructor(private http:HttpClient, private headerService:HeaderService) { }

  getEtiquetas():Observable<Etiquetas[]>{
    return this.http.get<Etiquetas[]>(this.apiEtiquetas, {headers: this.headerService.getHeader()});
  }

  getEtiquetasId(id:number):Observable<Etiquetas>{
    return this.http.get<Etiquetas>(`${this.apiEtiquetas}/${id}`, {headers: this.headerService.getHeader()});
  }
}
