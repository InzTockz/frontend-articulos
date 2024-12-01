import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulos } from '../models/articulos';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  private articulosApi:string = 'http://localhost:8080/articulos';

  constructor(private http:HttpClient, private header:HeaderService, private hs:HeaderService) { }

  getAllArticulos():Observable<Articulos[]>{
    return this.http.get<Articulos[]>(this.articulosApi, {headers: this.hs.getHeader()});
  }

  getIdArticulos(id:number):Observable<Articulos>{
    return this.http.get<Articulos>(`${this.articulosApi}/${id}`, {headers: this.hs.getHeader()});
  }

  getArticulosFechas(fecha1:string, fecha2:string):Observable<Articulos[]>{
    return this.http.get<Articulos[]>(`${this.articulosApi}/date?fecha1=${fecha1}&fecha2=${fecha2}`, {headers: this.hs.getHeader()});
  }

  addArticulos(articulos:any):Observable<String>{
    return this.http.post<String>(this.articulosApi, articulos, {headers: this.hs.getHeader(), responseType: 'text' as 'json'});
  }

  updateArticulos(id:number, articulos:Articulos):Observable<Articulos>{
    return this.http.put<Articulos>(`${this.articulosApi}/${id}`, articulos, {headers: this.hs.getHeader()});
  }

  deleteIdArticulos(id:number):Observable<void>{
    return this.http.delete<void>(`${this.articulosApi}/${id}`, {headers: this.hs.getHeader()});
  }
}
