import { DatePipe } from '@angular/common';
import { Component, OnInit, Pipe, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Articulos } from 'src/app/models/articulos';
import { ArticulosService } from 'src/app/services/articulos.service';

@Component({
  selector: 'app-articulos-reporte',
  templateUrl: './articulos-reporte.component.html',
  styleUrls: ['./articulos-reporte.component.css']
})

export class ArticulosReporteComponent implements OnInit { 

  dataSource:Articulos[] = [];
  indice:string[] = ['ARTICULO', 'DESCRIPCION', 'PRESENTACION', 'FAMILIA', 'SUBFAMILIA', 'FECHA'];

  fecha1:string='';
  fecha2:string='';

  familiaControl = new FormControl<Articulos | null>(null, Validators.required);

  constructor(private datePipe:DatePipe, private articulosService:ArticulosService){}

  ngOnInit(): void {
    
  }

  getArticulosById():void{
    let fecha1 = this.datePipe.transform(this.fecha1, 'dd/MM/yyyy');
    let fecha2 = this.datePipe.transform(this.fecha2, 'dd/MM/yyyy');
    console.log(fecha1);
    console.log(fecha2);

    this.articulosService.getArticulosFechas(fecha1!, fecha2!).subscribe(
      data => {
        this.dataSource = data;
      }
    )
  }
}
