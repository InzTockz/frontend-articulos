import { identifierName } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Familias } from 'src/app/models/familias';
import { Subfamilias } from 'src/app/models/subfamilias';
import { FamiliasService } from 'src/app/services/familias.service';
import { SubfamiliasService } from 'src/app/services/subfamilias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-add-subfamilia',
  templateUrl: './dialog-add-subfamilia.component.html',
  styleUrls: ['./dialog-add-subfamilia.component.css']
})
export class DialogAddSubfamiliaComponent implements OnInit {

  familias:Familias[] = []
  codigo!:string;
  descripcion!:string;
  familiaId!:number;

  constructor(public dialogRef: MatDialogRef<DialogAddSubfamiliaComponent>, private familiaService:FamiliasService,
    @Inject(MAT_DIALOG_DATA) public data:number, private subFamiliaService:SubfamiliasService
  ){}

  ngOnInit(): void {
    this.getFamilias();
  }

  getFamilias():void{
    this.familiaService.getAllFamilias().subscribe(
      data => {
        this.familias = data;
      }
    )
  }

  registrarSubFamilia():void{

    let subfamilia = {
      codigo: this.codigo,
      descripcion: this.descripcion,
      familias: {
        id: this.familiaId
      }
    }

    this.subFamiliaService.addSubFamilias(subfamilia).subscribe(
      () => {
        Swal.fire({
          text: 'Subfamilia registrada',
          icon: 'success'
        })
        this.dialogRef.close();
      }
    )
  }
}
