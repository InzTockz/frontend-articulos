import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Articulos } from 'src/app/models/articulos';
import { ArticulosService } from 'src/app/services/articulos.service';
import Swal from 'sweetalert2';
import { DialogAddArticuloComponent } from '../dialog-add-articulo/dialog-add-articulo.component';
import { DialogUpdateArticulosComponent } from '../dialog-update-articulos/dialog-update-articulos.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-articulo',
  templateUrl: './list-articulo.component.html',
  styleUrls: ['./list-articulo.component.css']
})
export class ListArticuloComponent implements OnInit, AfterViewInit {

  articulos = new MatTableDataSource<Articulos>();
  columnasArticulos: string[] = ['Nro. Articulo', 'Descripcion', 'Presentacion', 'Familia', 'SubFamilia', 'Fec. Creacion', 'Accion'];

  @ViewChild(MatPaginator) paginator!:MatPaginator;

  constructor(private articulosService: ArticulosService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getArticulos();
  }

  ngAfterViewInit(): void {
    this.articulos.paginator = this.paginator;
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogAddArticuloComponent, {
      width: '100%',
      //height: '50%',
      enterAnimationDuration,
      exitAnimationDuration
    });

    //dialogRef.before

    dialogRef.afterClosed().subscribe(
      () => this.getArticulos()
    );
  }

  openDialog2(enterAnimationDuration: string, exitAnimationDuration: string, id:number): void {
    const dialogRef = this.dialog.open(DialogUpdateArticulosComponent, {
      data: id,
      enterAnimationDuration,
      exitAnimationDuration
    });

    //dialogRef.before

    dialogRef.afterClosed().subscribe(
      () => this.getArticulos()
    );
  }

  getArticulos(): void {
    this.articulosService.getAllArticulos().subscribe(
      data => this.articulos.data = data
    )
  }

  deleteArticulos(id: number): void {

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
        this.articulosService.deleteIdArticulos(id).subscribe(
          () => this.getArticulos()
        );

        Swal.fire({
          title: "Eliminado!",
          text: "SubFamilia ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }
}
