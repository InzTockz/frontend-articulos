import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Articulos } from 'src/app/models/articulos';
import { ArticulosService } from 'src/app/services/articulos.service';
import Swal from 'sweetalert2';
import { DialogAddArticuloComponent } from '../dialog-add-articulo/dialog-add-articulo.component';
import { DialogUpdateArticulosComponent } from '../dialog-update-articulos/dialog-update-articulos.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogInfoArticulosComponent } from '../dialog-info-articulos/dialog-info-articulos.component';

@Component({
  selector: 'app-list-articulo',
  templateUrl: './list-articulo.component.html',
  styleUrls: ['./list-articulo.component.css']
})
export class ListArticuloComponent implements OnInit, AfterViewInit {

  articulos = new MatTableDataSource<Articulos>();
  columnasArticulos: string[] = ['Nro. Articulo', 'Descripcion', 'Presentacion', 'Familia', 'SubFamilia', 'Fec. Creacion', 'Accion'];

  @ViewChild(MatPaginator) paginator!:MatPaginator;

  constructor(private articulosService: ArticulosService, public dialog: MatDialog,
    private authService:AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getArticulos();
    this.articulos.filterPredicate = (data: Articulos, filter: string) => {
      const formattedDate = new Date(data.fecCreacion!).toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric'});
      const dataStr = `
      ${data.nroArticulo}
      ${data.descripcion}
      ${data.presentacion}
      ${data.familiasDto?.descripcion}
      ${data.subFamiliasDto?.descripcion}
      ${formattedDate}
      `.toLowerCase();
      return dataStr.includes(filter);
    }
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
      width: '100%',
      data: id,
      enterAnimationDuration,
      exitAnimationDuration
    });

    //dialogRef.before

    dialogRef.afterClosed().subscribe(
      () => this.getArticulos()
    );
  }

  openDialog3(enterAnimationDuration:string, exitAnimationDuration:string, id:number):void{
    const dialogRef = this.dialog.open(DialogInfoArticulosComponent, 
      {
        width: '100%',
        data: id,
        enterAnimationDuration,
        exitAnimationDuration
      }
    )
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

  isAdmirOrOperator():boolean{
    const token = this.authService.getItem('token').roleName;
    return token === 'ADMIN' || token === 'OPERATOR' ? true:false;
  }

  filtro(event:Event){
    const filtrarValor = (event.target as HTMLInputElement).value;
    this.articulos.filter = filtrarValor.trim().toLowerCase();
  }
}
