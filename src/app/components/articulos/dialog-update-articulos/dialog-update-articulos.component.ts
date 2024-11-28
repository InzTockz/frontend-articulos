import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Familias } from 'src/app/models/familias';
import { Subfamilias } from 'src/app/models/subfamilias';
import { ArticulosService } from 'src/app/services/articulos.service';
import { FamiliasService } from 'src/app/services/familias.service';
import { SubfamiliasService } from 'src/app/services/subfamilias.service';
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

  familias:Familias[] = [];
  subFamilias:Subfamilias[] = [];

  constructor(private familiasService:FamiliasService, private subFamiliasService:SubfamiliasService,
    public dialogRef:MatDialogRef<DialogUpdateArticulosComponent>, @Inject(MAT_DIALOG_DATA) public data:number,
    private articulosService:ArticulosService
  ){}

  ngOnInit(): void {
    this.getFamilias();
    this.getArticulosId();
  }

  getFamilias():void{
    this.familiasService.getAllFamilias().subscribe(
      data => this.familias = data
    )
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
