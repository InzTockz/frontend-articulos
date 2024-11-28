import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Familias } from 'src/app/models/familias';
import { FamiliasService } from 'src/app/services/familias.service';
import Swal from 'sweetalert2';
import { DialogAddFamiliaComponent } from '../dialog-add-familia/dialog-add-familia.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateFamiliaComponent } from '../dialog-update-familia/dialog-update-familia.component';

@Component({
  selector: 'app-list-familia',
  templateUrl: './list-familia.component.html',
  styleUrls: ['./list-familia.component.css']
})
export class ListFamiliaComponent {

  displayedColumns: string[] = ['Codigo', 'Descripcion', 'Nomenclatura', 'Accion'];
  dataSource: Familias[] = [];

  constructor(private familiasService: FamiliasService, private router:Router, public dialog:MatDialog) {
  }

  ngOnInit(): void {
    this.getFamilias();
  }

  openDialog1(enterAnimationDuration:string, exitAnimationDuration:string):void{
    const dialogRef = this.dialog.open(DialogAddFamiliaComponent, 
      {
        enterAnimationDuration,
        exitAnimationDuration
      });

      dialogRef.afterClosed().subscribe(
        () => {
          this.getFamilias();
        }
      );
  }

  openDialog2(enterAnimationDuration:string, exitAnimationDuration:string, id:number):void{
    console.log('id es: ' + id)
    const dialogRef = this.dialog.open(DialogUpdateFamiliaComponent, 
      {
        data: id,
        enterAnimationDuration,
        exitAnimationDuration
      });

      dialogRef.afterClosed().subscribe(
        () => {
          this.getFamilias();
        }
      );
  }

  getFamilias(): void {
    this.familiasService.getAllFamilias().subscribe(
      data => {
        this.dataSource = data;
      }
    );
  }

  deleteIdFamilias(id: number): void {
    Swal.fire({
      title: "Estas seguro?",
      text: "No pogras revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminalo!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.familiasService.deleteIdFamilias(id).subscribe(
          () => this.getFamilias()
        );

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

}
