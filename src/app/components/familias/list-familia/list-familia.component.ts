import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Familias } from 'src/app/models/familias';
import { FamiliasService } from 'src/app/services/familias.service';
import Swal from 'sweetalert2';
import { DialogAddFamiliaComponent } from '../dialog-add-familia/dialog-add-familia.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogUpdateFamiliaComponent } from '../dialog-update-familia/dialog-update-familia.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-familia',
  templateUrl: './list-familia.component.html',
  styleUrls: ['./list-familia.component.css']
})
export class ListFamiliaComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['Codigo', 'Descripcion', 'Nomenclatura', 'Accion'];
  dataSource = new MatTableDataSource<Familias>();

  @ViewChild(MatPaginator) paginator!:MatPaginator;

  constructor(private familiasService: FamiliasService, private router:Router, public dialog:MatDialog) {
  }

  ngOnInit(): void {
    this.getFamilias();
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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
        this.dataSource.data = data;
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
