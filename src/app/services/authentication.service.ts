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
    const token = sessionStorage.getItem(key);

    if(token!=null){
      return JSON.parse(token);
    } else {
      return null;
    }
  }

  removeItem(key:string):void{
    sessionStorage.removeItem(key);
  }

  clear(){
    sessionStorage.clear();
  }
}
