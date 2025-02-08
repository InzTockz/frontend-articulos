import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Color } from 'src/app/models/color';
import { Etiquetas } from 'src/app/models/etiquetas';
import { Familias } from 'src/app/models/familias';
import { Subfamilias } from 'src/app/models/subfamilias';
import { TiempoVida } from 'src/app/models/tiempo-vida';
import { ArticulosService } from 'src/app/services/articulos.service';
import { ColorService } from 'src/app/services/color.service';
import { EtiquetasService } from 'src/app/services/etiquetas.service';
import { FamiliasService } from 'src/app/services/familias.service';
import { SubfamiliasService } from 'src/app/services/subfamilias.service';
import { TiempoVidaService } from 'src/app/services/tiempo-vida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-update-articulos',
  templateUrl: './dialog-update-articulos.component.html',
  styleUrls: ['./dialog-update-articulos.component.css']
})
export class DialogUpdateArticulosComponent implements OnInit {

  descripcion!:string;
  presentacion!:string;
  familiaId!:number;
  subFamiliaId!:number;
  etiquetas:Etiquetas[] = [];
  etiquetaId!:number;
  color:Color[] = [];
  colorId!:number;
  etapa!:string;
  descripcionEtapa!:string
  dosis!:string;
  tiempoVida:TiempoVida[] = [];
  tiempoVidaId!:number;

  familias:Familias[] = [];
  subFamilias:Subfamilias[] = [];

  constructor(private familiasService:FamiliasService, private subFamiliasService:SubfamiliasService,
    public dialogRef:MatDialogRef<DialogUpdateArticulosComponent>, @Inject(MAT_DIALOG_DATA) public data:number,
    private articulosService:ArticulosService, private etiquetaService:EtiquetasService, private colorService:ColorService,
    private tiempoVidaService:TiempoVidaService
  ){}

  ngOnInit(): void {
    this.getFamilias();
    this.getEtiquetas();
    this.getArticulosId();
    this.getColor();
    this.getTiempoVida();
  }

  getFamilias():void{
    this.familiasService.getAllFamilias().subscribe(
      data => this.familias = data
    )
  }

  getEtiquetas(){
    this.etiquetaService.getEtiquetas().subscribe(
      data => {
        this.etiquetas = data;
      }
    );
  }

  getColor(){
    this.colorService.getArticulos().subscribe(
      data => {
        this.color = data;
      }
    );
  }

  getTiempoVida(){
    this.tiempoVidaService.getTiempoVida().subscribe(
      data => {
        this.tiempoVida = data;
      }
    );
  }

  getSubFamiliasId(id:any):void{
    this.subFamiliasService.getSubFamiliasByFamilias(id).subscribe(
      data => {
        this.subFamilias = data;
      }
    )
  }

  getArticulosId():void{
    this.articulosService.getIdArticulos(this.data).subscribe(
      data => {
        this.descripcion = data.descripcion!;
        this.presentacion = data.presentacion!;
        this.familiaId = data.familiasDto!.id!;
        this.dosis = data.dosis!;
        this.descripcionEtapa = data.dosis!;
        this.etiquetaId = data.etiquetaDto!.id!;
        this.colorId = data.colorDto!.id!;
        this.etapa = data.etapa!;
        this.tiempoVidaId = data.tiempoVidaDto!.id!;
        
        this.subFamiliasService.getSubFamiliasByFamilias(data.familiasDto!.id!).subscribe(
          subfami => this.subFamilias = subfami
        )
        this.subFamiliaId = data.subFamiliasDto!.id!;
      }
    )
  }

  actualizarArticulos():void{

    let articulo = {
      id: this.data,
      descripcion: this.descripcion,
      presentacion: this.presentacion,
      familiasDto: {
        id: this.familiaId
      },
      subFamiliasDto: {
        id: this.subFamiliaId
      },
      etiquetaDto: {
        id: this.etiquetaId
      },
      colorDto: {
        id: this.colorId
      },
      etapa: this.etapa,
      descripcionEtapa: this.descripcionEtapa,
      dosis: this.dosis,
      tiempoVidaDto: {
        id: this.tiempoVidaId
      }
    }

    this.articulosService.updateArticulos(this.data, articulo).subscribe(
      () => {
        Swal.fire({
          text: 'Articulo actualizado',
          icon: 'success'
        })
        this.dialogRef.close();
      }
    );
  }
}
