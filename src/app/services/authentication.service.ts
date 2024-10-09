import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jwtclient } from '../models/jwtclient';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiAuth:string = 'http://localhost:8080/security';

  constructor(private http:HttpClient) { }

  login(login:Login):Observable<Jwtclient>{
    return this.http.post<Jwtclient>(`${this.apiAuth}/login`, login);
  }

  setItem(key:string, value:any):void{
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key:string){
    const item = sessionStorage.getItem(key);

    if(item){
      return JSON.parse(item);
    } else {
      return null;
    }
    //return item ? JSON.parse(item) : null;
  }

  removeItem(key:string):void{
    sessionStorage.removeItem(key);
  }

  clear():void{
    sessionStorage.clear();
  }
}
