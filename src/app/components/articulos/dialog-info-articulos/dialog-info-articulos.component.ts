import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Articulos } from 'src/app/models/articulos';
import { ArticulosService } from 'src/app/services/articulos.service';

@Component({
  selector: 'app-dialog-info-articulos',
  templateUrl: './dialog-info-articulos.component.html',
  styleUrls: ['./dialog-info-articulos.component.css']
})
export class DialogInfoArticulosComponent implements OnInit {

  articulos:Articulos = new Articulos();
  etiquetas:any;
  color:any;
  tiempoVida:any;

  constructor(private articuloService:ArticulosService, public dialogRef:MatDialogRef<DialogInfoArticulosComponent>,
    @Inject(MAT_DIALOG_DATA) public data:number
  ){}

  ngOnInit(): void {
    this.getArticuloById();
  }

  getArticuloById(){
    this.articuloService.getIdArticulos(this.data).subscribe(
      data => {
        this.articulos = data;
        this.etiquetas = data.etiquetaDto?.codigo === '00' ? '' : data.etiquetaDto?.codigo;
        this.color = data.colorDto!.codigo === '00' ? '': data.colorDto!.descripcion;
        this.tiempoVida = data.tiempoVidaDto!.codigo === '00' ? '' : data.tiempoVidaDto!.descripcion;
      }
    )
  }

}
