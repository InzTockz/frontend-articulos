import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Familias } from '../models/familias';
import { Observable } from 'rxjs';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class FamiliasService {

  private familiasApi:string = 'http://localhost:8080/familias';

  constructor(private http:HttpClient, private header:HeaderService) { }

  getAllFamilias():Observable<Familias[]>{
    return this.http.get<Familias[]>(this.familiasApi, {headers: this.header.headers});
  }

  getIdFamilias(id:number):Observable<Familias>{
    return this.http.get<Familias>(`${this.familiasApi}/${id}`, {headers: this.header.headers});
  }

  saveFamilias(familias:Familias):Observable<Familias>{
    return this.http.post<Familias>(this.familiasApi, familias, {headers: this.header.headers});
  }

  updateFamilias(id:number, familias:Familias):Observable<Familias>{
    return this.http.put<Familias>(`${this.familiasApi}/${id}`, familias, {headers: this.header.headers});
  }

  deleteIdFamilias(id:number):Observable<void>{
    return this.http.delete<void>(`${this.familiasApi}/${id}`, {headers: this.header.headers});
  }
}
