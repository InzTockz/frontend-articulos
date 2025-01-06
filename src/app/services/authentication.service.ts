import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jwtclient } from '../models/jwtclient';
import { Login } from '../models/login';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiAuth:string = 'http://localhost:8080/security';

  constructor(private http:HttpClient, private router:Router, private toastr:ToastrService) { }

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

  logout(){
    sessionStorage.clear();
    //this.router.navigate(['/login']);
    //this.toastr.error('Session Finalizada');
  }

  isTokenExpired():boolean{
    const token = this.getItem('token')
    if(!token){
      return true; //Si no hay token, se considera expirado
    }

    const payload = JSON.parse(atob(token.token.split('.')[1])); // Decodifica el payload del JWT
    const now = Math.floor(Date.now() / 1000); // tiempo actual en segundos
    return payload.exp < now; // Compara la expiracion
  }
}
