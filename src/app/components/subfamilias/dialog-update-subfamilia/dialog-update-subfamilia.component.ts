import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DialogAddSubfamiliaComponent } from '../dialog-add-subfamilia/dialog-add-subfamilia.component';
import { FamiliasService } from 'src/app/services/familias.service';
import { SubfamiliasService } from 'src/app/services/subfamilias.service';
import { Familias } from 'src/app/models/familias';

@Component({
  selector: 'app-dialog-update-subfamilia',
  templateUrl: './dialog-update-subfamilia.component.html',
  styleUrls: ['./dialog-update-subfamilia.component.css']
})
export class DialogUpdateSubfamiliaComponent {

  familias:Familias[] = []
  codigo!:string;
  descripcion!:string;
  familiaId!:number;

  constructor(public dialogRef: MatDialogRef<DialogUpdateSubfamiliaComponent>, private familiaService:FamiliasService,
    @Inject(MAT_DIALOG_DATA) public data:number, private subFamiliaService:SubfamiliasService
  ){}

  ngOnInit(): void {
    this.getFamilias();
    this.getSubFamiliaId();
  }

  getFamilias():void{
    this.familiaService.getAllFamilias().subscribe(
      data => {
        this.familias = data;
      }
    )
  }

  getSubFamiliaId():void{
    this.subFamiliaService.getIdSubFamilias(this.data).subscribe(
      data => {
        this.codigo = data.codigo!;
        this.descripcion = data.descripcion!;
        this.familiaId = data.familias!.id!;
      }
    )
  }

  actualizarSubFamilia():void{

    let subfamilia = {
      id: this.data,
      codigo: this.codigo,
      descripcion: this.descripcion,
      familias: {
        id: this.familiaId
      }
    }

    this.subFamiliaService.updateSubFamilias(this.data, subfamilia).subscribe(
      () => {
        Swal.fire({
          text: 'Subfamilia actualizada',
          icon: 'success'
        })
        this.dialogRef.close();
      }
    )
  }
}
