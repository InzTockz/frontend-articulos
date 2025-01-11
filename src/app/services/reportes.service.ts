import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private reportesApi = "http://localhost:8080/api/reportes"

  constructor(private http:HttpClient, private hs:HeaderService) { }

  reporteFamilias():Observable<Blob>{
    return this.http.get(this.reportesApi+"/reportFamilias", { responseType: 'blob', headers: this.hs.getHeader()});
  }

  reporteSubFamilias():Observable<Blob>{
    return this.http.get(`${this.reportesApi}/reportSubFamilias`, { responseType: 'blob', headers: this.hs.getHeader()})
  }

  reporteSubFamiliasPorFamilia(id:number):Observable<Blob>{
    return this.http.get(`${this.reportesApi}/reportSubFamiliasIdFamilias/${id}`, { responseType: 'blob', headers: this.hs.getHeader()})
  }

  reporteArticulosPorFechas(fecha1:string, fecha2:string):Observable<Blob>{
    return this.http.get(`${this.reportesApi}/reportArticulosFechas?fecha1=${fecha1}&fecha2=${fecha2}`, { responseType: 'blob', headers: this.hs.getHeader()});
  }

}
