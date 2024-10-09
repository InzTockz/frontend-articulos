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

  constructor(private http:HttpClient, private header:HeaderService) { }

  getAllSubFamilias():Observable<Subfamilias[]>{
    return this.http.get<Subfamilias[]>(this.apiSubFamilia, {headers: this.header.headers});
  }

  getIdSubFamilias(id:number):Observable<Subfamilias>{
    return this.http.get<Subfamilias>(`${this.apiSubFamilia}/${id}`, {headers: this.header.headers});
  }

  getSubFamiliasByFamilias(id:number):Observable<Subfamilias[]>{
    return this.http.get<Subfamilias[]>(`${this.apiSubFamilia}/familias/${id}`, {headers: this.header.headers});
  }

  addSubFamilias(subFamilias:Subfamilias):Observable<Subfamilias>{
    return this.http.post<Subfamilias>(this.apiSubFamilia, subFamilias, {headers: this.header.headers});
  }

  updateSubFamilias(id:number, subFamilias:Subfamilias):Observable<Subfamilias>{
    return this.http.put<Subfamilias>(`${this.apiSubFamilia}/${id}`, subFamilias, {headers: this.header.headers});
  }

  deleteIdSubFamilias(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiSubFamilia}/${id}`, {headers: this.header.headers});
  }
}
