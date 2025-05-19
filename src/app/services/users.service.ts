import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users';
import { HeaderService } from './header.service';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //private apiUsers:string = 'http://localhost:8080/user';
  private apiUsers:string = 'http://192.168.1.10:8082/user';

  constructor(private http:HttpClient, private hs:HeaderService) { }

  register(users:Users):Observable<Users>{
    return this.http.post<Users>(`${this.apiUsers}/registrar`, users, {headers: this.hs.getHeader()});
  }

  getUserId(id:number):Observable<Users>{
    return this.http.get<Users>(`${this.apiUsers}/buscar/${id}`, {headers: this.hs.getHeader()});
  }

  getAllUsers():Observable<Users[]>{
    return this.http.get<Users[]>(`${this.apiUsers}/listar`, {headers: this.hs.getHeader()});
  }

  updateUsers(id:number, users:Users):Observable<Users>{
    return this.http.put<Users>(`${this.apiUsers}/actualizar/${id}`, users, {headers: this.hs.getHeader()});
  }

  deleteUsers(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUsers}/eliminar/${id}`, {headers: this.hs.getHeader()});
  }

  findUserByUsername(login:Login):Observable<Users>{
    return this.http.get<Users>(`${this.apiUsers}/username/${login.username}`);
  }
}
