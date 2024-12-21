import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Familias } from 'src/app/models/familias';
import { FamiliasService } from 'src/app/services/familias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-add-familia',
  templateUrl: './dialog-add-familia.component.html',
  styleUrls: ['./dialog-add-familia.component.css']
})
export class DialogAddFamiliaComponent implements OnInit {

  familia:Familias = new Familias;

  constructor(public dialogRef: MatDialogRef<DialogAddFamiliaComponent>, private familiaService:FamiliasService){}

  ngOnInit(): void {
    
  }

  registrarFamilia(){
    return this.familiaService.saveFamilias(this.familia).subscribe(
      response => {
        this.dialogRef.close();
        Swal.fire({
          title: 'Registro correcto',
          text: 'Familia registrada de manera correcta',
          icon: 'success'
        });
      }
    )
  }

}
