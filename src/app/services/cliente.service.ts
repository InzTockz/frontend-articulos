import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { Clientes } from '../models/clientes';
import { CredencialesCliente } from '../models/credenciales-cliente';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //private apiCliente:string = 'http://localhost:8080/api/clientes'
  private apiCliente:string = 'http://192.168.1.10:8082/api/clientes';

  constructor(private http:HttpClient, private hs:HeaderService) { }

  getClientes():Observable<Clientes[]>{
    return this.http.get<Clientes[]>(this.apiCliente, {headers: this.hs.getHeader()});
  }

  getClientesId(id:number):Observable<Clientes>{
    return this.http.get<Clientes>(`${this.apiCliente}/${id}`, {headers: this.hs.getHeader()});
  }

  revalidarCredenciales():Observable<any>{
    return this.http.post<any>(`${this.apiCliente}/revalidarCredenciales`, null, {headers: this.hs.getHeader()})
  }

  revalidarAccesosPortal():Observable<any>{
    return this.http.post<any>(`${this.apiCliente}/revalidarAccesosPortal`, null, {headers: this.hs.getHeader()});
  }

  addCredenciales(id:number, credenciales:CredencialesCliente):Observable<any>{
    return this.http.put<any>(`${this.apiCliente}/${id}`, credenciales, {headers: this.hs.getHeader()});
  }

  enviarCredenciales(email:string, id:number):Observable<any>{
    return this.http.post<any>(`${this.apiCliente}/enviarCredenciales/email/${email}/id/${id}`, null, {headers: this.hs.getHeader()});
  }
}
