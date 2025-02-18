import { Subfamilias } from './../models/subfamilias';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class SubfamiliasService {

  //private apiSubFamilia:string = 'http://localhost:8080/subfamilias';
  private apiSubFamilia:string = 'http://192.168.1.12:8011/ArticulosBatt/subfamilias';

  constructor(private http:HttpClient, private header:HeaderService, private hs:HeaderService) { }

  getAllSubFamilias():Observable<Subfamilias[]>{
    return this.http.get<Subfamilias[]>(`${this.apiSubFamilia}/listar`, {headers: this.hs.getHeader()});
  }

  getIdSubFamilias(id:number):Observable<Subfamilias>{
    return this.http.get<Subfamilias>(`${this.apiSubFamilia}/buscar/${id}`, {headers: this.hs.getHeader()});
  }

  getSubFamiliasByFamilias(id:number):Observable<Subfamilias[]>{
    return this.http.get<Subfamilias[]>(`${this.apiSubFamilia}/buscar/familias/${id}`, {headers: this.hs.getHeader()});
  }

  addSubFamilias(subFamilias:Subfamilias):Observable<Subfamilias>{
    return this.http.post<Subfamilias>(`${this.apiSubFamilia}/registrar`, subFamilias, {headers: this.hs.getHeader()});
  }

  updateSubFamilias(id:number, subFamilias:Subfamilias):Observable<Subfamilias>{
    return this.http.put<Subfamilias>(`${this.apiSubFamilia}/actualizar/${id}`, subFamilias, {headers: this.hs.getHeader()});
  }

  deleteIdSubFamilias(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiSubFamilia}/eliminar/${id}`, {headers: this.hs.getHeader()});
  }
}
