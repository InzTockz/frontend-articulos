import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private reportesApi = "http://localhost:8080/api"

  constructor(private http:HttpClient) { }

  reporteFamilias():Observable<Blob>{
    return this.http.get(this.reportesApi+"/reportFamilias", { responseType: 'blob'});
  }

  reporteSubFamilias():Observable<Blob>{
    return this.http.get(`${this.reportesApi}/reportSubFamilias`, { responseType: 'blob'})
  }

  reporteSubFamiliasPorFamilia(id:number):Observable<Blob>{
    return this.http.get(`${this.reportesApi}/reportSubFamiliasIdFamilias/${id}`, { responseType: 'blob'})
  }

}
