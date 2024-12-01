import { Subfamilias } from './../models/subfamilias';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class SubfamiliasService {

  private apiSubFamilia:string = 'http://localhost:8080/subfamilias';

  constructor(private http:HttpClient, private header:HeaderService, private hs:HeaderService) { }

  getAllSubFamilias():Observable<Subfamilias[]>{
    return this.http.get<Subfamilias[]>(this.apiSubFamilia, {headers: this.hs.getHeader()});
  }

  getIdSubFamilias(id:number):Observable<Subfamilias>{
    return this.http.get<Subfamilias>(`${this.apiSubFamilia}/${id}`, {headers: this.hs.getHeader()});
  }

  getSubFamiliasByFamilias(id:number):Observable<Subfamilias[]>{
    return this.http.get<Subfamilias[]>(`${this.apiSubFamilia}/familias/${id}`, {headers: this.hs.getHeader()});
  }

  addSubFamilias(subFamilias:Subfamilias):Observable<Subfamilias>{
    return this.http.post<Subfamilias>(this.apiSubFamilia, subFamilias, {headers: this.hs.getHeader()});
  }

  updateSubFamilias(id:number, subFamilias:Subfamilias):Observable<Subfamilias>{
    return this.http.put<Subfamilias>(`${this.apiSubFamilia}/${id}`, subFamilias, {headers: this.hs.getHeader()});
  }

  deleteIdSubFamilias(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiSubFamilia}/${id}`, {headers: this.hs.getHeader()});
  }
}
