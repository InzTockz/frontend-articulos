import { DialogRef } from '@angular/cdk/dialog';
import { FamiliasService } from './../../../services/familias.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Subfamilias } from 'src/app/models/subfamilias';
import { SubfamiliasService } from 'src/app/services/subfamilias.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddSubfamiliaComponent } from '../dialog-add-subfamilia/dialog-add-subfamilia.component';
import { DialogUpdateSubfamiliaComponent } from '../dialog-update-subfamilia/dialog-update-subfamilia.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-list-subfamilia',
  templateUrl: './list-subfamilia.component.html',
  styleUrls: ['./list-subfamilia.component.css']
})
export class ListSubfamiliaComponent implements OnInit, AfterViewInit{

  dataSource = new MatTableDataSource<Subfamilias>();
  displayedColumns:string[] = ['Codigo', 'Descripcion', 'Familia', 'Accion'];

  @ViewChild(MatPaginator) paginator!:MatPaginator;

  constructor(private subFamiliasService:SubfamiliasService, private familiaService:FamiliasService, public dialog:MatDialog,
    private authService:AuthenticationService
  ){}

  ngOnInit(): void {
    this.getSubFamilias();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  openDialog1(enterAnimationDuration:string, exitAnimationDuration:string):void{
    const dialogRef = this.dialog.open(DialogAddSubfamiliaComponent,
      {
        width: '30%',
        enterAnimationDuration,
        exitAnimationDuration
      }
    );
    dialogRef.afterClosed().subscribe(
      () => {
        this.getSubFamilias();
      }
    );
  }

  openDialog2(enterAnimationDuration:string, exitAnimationDuration:string, id:number):void{
    const dialogRef = this.dialog.open(DialogUpdateSubfamiliaComponent,
      {
        width: '30%',
        data: id,
        enterAnimationDuration,
        exitAnimationDuration
      }
    );
    dialogRef.afterClosed().subscribe(
      () => {
        this.getSubFamilias();
      }
    );
  }

  getSubFamilias():void{
    this.subFamiliasService.getAllSubFamilias().subscribe(
      data => {
        this.dataSource.data = data;
      }
    )
  }

  deleteSubFamilias(id:number):void{
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
        this.subFamiliasService.deleteIdSubFamilias(id).subscribe(
          () => this.getSubFamilias()
        );

        Swal.fire({
          title: "Eliminado!",
          text: "SubFamilia ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }

  isAdmirOrOperator():boolean{
    const token = this.authService.getItem('token').roleName;
    return token === 'ADMIN' || token === 'OPERATOR' ? true:false;
  }
}
