import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Familias } from '../models/familias';
import { Observable } from 'rxjs';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class FamiliasService {

  //private familiasApi:string = 'http://localhost:8080/familias';
  private familiasApi:string = 'http://192.168.1.10:8082/familias';

  constructor(private http:HttpClient, private header:HeaderService, private hs:HeaderService) { }

  getAllFamilias():Observable<Familias[]>{
    return this.http.get<Familias[]>(`${this.familiasApi}/listar`, {headers: this.hs.getHeader()});
  }

  getIdFamilias(id:number):Observable<Familias>{
    return this.http.get<Familias>(`${this.familiasApi}/buscar/${id}`, {headers: this.hs.getHeader()});
  }

  saveFamilias(familias:Familias):Observable<Familias>{
    return this.http.post<Familias>(`${this.familiasApi}/registrar`, familias, {headers: this.hs.getHeader()});
  }

  updateFamilias(id:number, familias:Familias):Observable<Familias>{
    return this.http.put<Familias>(`${this.familiasApi}/actualizar/${id}`, familias, {headers: this.hs.getHeader()});
  }

  deleteIdFamilias(id:number):Observable<void>{
    return this.http.delete<void>(`${this.familiasApi}/eliminar/${id}`, {headers: this.hs.getHeader()});
  }
}
