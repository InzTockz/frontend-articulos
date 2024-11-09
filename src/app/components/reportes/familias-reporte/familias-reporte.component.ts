import { Component, OnInit } from '@angular/core';
import { Familias } from 'src/app/models/familias';
import { FamiliasService } from 'src/app/services/familias.service';

@Component({
  selector: 'app-familias-reporte',
  templateUrl: './familias-reporte.component.html',
  styleUrls: ['./familias-reporte.component.css']
})
export class FamiliasReporteComponent implements OnInit {

  dataSource:Familias[] = [];
  indice:string[] = ['Codigo', 'Descripcion', 'Nomenclatura'];

  constructor(private familiaService:FamiliasService){}

  ngOnInit(): void {
    
  }

  getFamilia():void{
    this.familiaService.getAllFamilias().subscribe(
      data => {
        this.dataSource = data;
      }
    );
  }

  
}
