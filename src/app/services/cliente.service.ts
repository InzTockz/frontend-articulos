import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { Clientes } from '../models/clientes';
import { CredencialesCliente } from '../models/credenciales-cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiCliente:string = 'http://localhost:8080/api/clientes'

  constructor(private http:HttpClient) { }

  getClientes():Observable<Clientes[]>{
    return this.http.get<Clientes[]>(this.apiCliente);
  }

  getClientesId(id:number):Observable<Clientes>{
    return this.http.get<Clientes>(`${this.apiCliente}/${id}`);
  }

  revalidarCredenciales():Observable<any>{
    return this.http.post<any>(`${this.apiCliente}/revalidarCredenciales`, null)
  }

  addCredenciales(id:number, credenciales:CredencialesCliente):Observable<any>{
    return this.http.put<any>(`${this.apiCliente}/${id}`, credenciales);
  }

  enviarCredenciales(email:string, id:number):Observable<any>{
    return this.http.post<any>(`${this.apiCliente}/enviarCredenciales/email/${email}/id/${id}`, null);
  }
}
