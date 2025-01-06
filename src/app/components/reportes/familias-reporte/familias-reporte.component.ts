import { Component, OnInit } from '@angular/core';
import { Familias } from 'src/app/models/familias';
import { FamiliasService } from 'src/app/services/familias.service';
import { ReportesService } from 'src/app/services/reportes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-familias-reporte',
  templateUrl: './familias-reporte.component.html',
  styleUrls: ['./familias-reporte.component.css']
})
export class FamiliasReporteComponent implements OnInit {

  dataSource:Familias[] = [];
  indice:string[] = ['Codigo', 'Descripcion', 'Nomenclatura'];

  constructor(private familiaService:FamiliasService, private reporteService:ReportesService){}

  ngOnInit(): void {

  }

  getFamilia():void{
    this.familiaService.getAllFamilias().subscribe(
      data => {
        this.dataSource = data;
      }
    );
  }

  getReporte():void{
    this.reporteService.reporteFamilias().subscribe(
      response => {

        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');

        a.href = url;
        a.download = 'Reporte de Familias';
        a.click()

        Swal.fire({
          title: 'Reporte Generado',
          icon: 'success'
        })
      }
    )
  }

}
