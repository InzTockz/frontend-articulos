import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUsers:string = 'http://localhost:8080/user';

  constructor(private http:HttpClient, private hs:HeaderService) { }

  register(users:Users):Observable<Users>{
    return this.http.post<Users>(this.apiUsers, users, {headers: this.hs.getHeader()});
  }

  getUserId(id:number):Observable<Users>{
    return this.http.get<Users>(`${this.apiUsers}/${id}`, {headers: this.hs.getHeader()});
  }

  getAllUsers():Observable<Users[]>{
    return this.http.get<Users[]>(this.apiUsers, {headers: this.hs.getHeader()});
  }

  updateUsers(id:number, users:Users):Observable<Users>{
    return this.http.put<Users>(`${this.apiUsers}/${id}`, users, {headers: this.hs.getHeader()});
  }

  deleteUsers(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUsers}/${id}`, {headers: this.hs.getHeader()});
  }

}
