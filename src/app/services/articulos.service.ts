import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulos } from '../models/articulos';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  //private articulosApi:string = 'http://localhost:8080/articulos';
  private articulosApi:string = 'http://192.168.1.12:8011/ArticulosBatt/articulos';

  constructor(private http:HttpClient, private header:HeaderService, private hs:HeaderService) { }

  getAllArticulos():Observable<Articulos[]>{
    return this.http.get<Articulos[]>(`${this.articulosApi}/listar`, {headers: this.hs.getHeader()});
  }

  getIdArticulos(id:number):Observable<Articulos>{
    return this.http.get<Articulos>(`${this.articulosApi}/buscar/${id}`, {headers: this.hs.getHeader()});
  }

  getArticulosFechas(fecha1:string, fecha2:string):Observable<Articulos[]>{
    return this.http.get<Articulos[]>(`${this.articulosApi}/buscar/date?fecha1=${fecha1}&fecha2=${fecha2}`, {headers: this.hs.getHeader()});
  }

  addArticulos(articulos:any):Observable<String>{
    return this.http.post<String>(`${this.articulosApi}/registrar`, articulos, {headers: this.hs.getHeader(), responseType: 'text' as 'json'});
  }

  updateArticulos(id:number, articulos:Articulos):Observable<Articulos>{
    return this.http.put<Articulos>(`${this.articulosApi}/actualizar/${id}`, articulos, {headers: this.hs.getHeader()});
  }

  deleteIdArticulos(id:number):Observable<void>{
    return this.http.delete<void>(`${this.articulosApi}/eliminar/${id}`, {headers: this.hs.getHeader()});
  }
}
