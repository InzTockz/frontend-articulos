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

  constructor(private http:HttpClient, private headerService:HeaderService) { }

  getAllArticulos():Observable<Articulos[]>{
    return this.http.get<Articulos[]>(this.articulosApi, {headers: this.headerService.headers});
  }

  getIdArticulos(id:number):Observable<Articulos>{
    return this.http.get<Articulos>(`${this.articulosApi}/${id}`, {headers: this.headerService.headers});
  }

  addArticulos(articulos:Articulos):Observable<Articulos>{
    return this.http.post<Articulos>(this.articulosApi, articulos, {headers: this.headerService.headers});
  }

  updateArticulos(id:number, articulos:Articulos):Observable<Articulos>{
    return this.http.put<Articulos>(`${this.articulosApi}/${id}`, articulos, {headers: this.headerService.headers});
  }

  deleteIdArticulos(id:number):Observable<void>{
    return this.http.delete<void>(`${this.articulosApi}/${id}`, {headers: this.headerService.headers});
  }
}
