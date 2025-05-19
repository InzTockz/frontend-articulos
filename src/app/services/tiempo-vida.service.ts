import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TiempoVida } from '../models/tiempo-vida';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class TiempoVidaService {

  //private apiTiempoVida:string = "http://localhost:8080/api/tiempo-vida";
  private apiTiempoVida:string = "http://192.168.1.10:8082/api/tiempo-vida";

  constructor(private http:HttpClient, private headerService:HeaderService) { }

  getTiempoVida():Observable<TiempoVida[]>{
    return this.http.get<TiempoVida[]>(this.apiTiempoVida, {headers: this.headerService.getHeader()});
  }

  getTiempoVidaId(id:number):Observable<TiempoVida>{
    return this.http.get<TiempoVida>(`${this.apiTiempoVida}/${id}`, {headers: this.headerService.getHeader()});
  }
}
