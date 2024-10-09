import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUsers:string = 'http://localhost:8080/user';

  constructor(private http:HttpClient) { }

  register(users:Users):Observable<Users>{
    return this.http.post<Users>(this.apiUsers, users);
  }

  getUserId(id:number):Observable<Users>{
    return this.http.get<Users>(`${this.apiUsers}/${id}`);
  }
}
