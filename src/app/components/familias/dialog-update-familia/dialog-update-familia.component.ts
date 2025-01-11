import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Familias } from 'src/app/models/familias';
import { DialogAddFamiliaComponent } from '../dialog-add-familia/dialog-add-familia.component';
import { FamiliasService } from 'src/app/services/familias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-update-familia',
  templateUrl: './dialog-update-familia.component.html',
  styleUrls: ['./dialog-update-familia.component.css']
})
export class DialogUpdateFamiliaComponent implements OnInit {

  familia:Familias = new Familias();

  constructor(public dialogRef: MatDialogRef<DialogUpdateFamiliaComponent>, private familiaService:FamiliasService,
    @Inject(MAT_DIALOG_DATA) public data:number
  ){}

  ngOnInit(): void {
    this.getFamiliaById();
  }

  getFamiliaById():void{
    this.familiaService.getIdFamilias(this.data).subscribe(
      data => {
        this.familia.codigo = data.codigo;
        this.familia.descripcion = data.descripcion;
        this.familia.pronombre = data.pronombre;
      }
    )
  }

  actualizarFamilia(){
    return this.familiaService.updateFamilias(this.data, this.familia).subscribe(
      response => {
        this.dialogRef.close();
        Swal.fire({
          //title: 'Registro correcto',
          text: 'Familia actualizada de manera correcta',
          icon: 'success'
        });
      }
    )
  }
}
