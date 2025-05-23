import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  //private apiColor:string = "http://localhost:8080/api/color";
  private apiColor:string = "http://192.168.1.10:8082/api/color";

  constructor(private http:HttpClient, private headerService:HeaderService) { }

  getArticulos():Observable<Color[]>{
    return this.http.get<Color[]>(this.apiColor, {headers: this.headerService.getHeader()});
  }

  getArticulosId(id:number):Observable<Color>{
    return this.http.get<Color>(`${this.apiColor}/${id}`, {headers: this.headerService.getHeader()});
  }
}
