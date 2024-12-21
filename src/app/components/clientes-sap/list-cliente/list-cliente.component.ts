import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Clientes } from 'src/app/models/clientes';
import { ClienteService } from 'src/app/services/cliente.service';
import { DialogAddCredencialesComponent } from '../dialog-add-credenciales/dialog-add-credenciales.component';
import { DialogEnviarCredencialesComponent } from '../dialog-enviar-credenciales/dialog-enviar-credenciales.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent implements OnInit, AfterViewInit {

  clientes = new MatTableDataSource<Clientes>()
  columnasClientes:string[] = ['Ruc', 'Nombre', 'Correo', 'Usuario Portal', 'Clave Portal', 'Id Vendedor', 'Nombres',
    'Accion'
  ]

  @ViewChild(MatPaginator) paginator!:MatPaginator;

  constructor(private clienteService:ClienteService, public dialog:MatDialog){}

  ngOnInit(): void {
    this.listarClientes();
  }

  ngAfterViewInit(): void {
    this.clientes.paginator = this.paginator
  }

  listarClientes(){
    this.clienteService.getClientes().subscribe(
      data => {
        this.clientes.data = data;
      }
    )
  }

  openDialog(enterAnimationDuration:string, exitAnimationDuration:string, id:number):void{
    const dialogRef = this.dialog.open(DialogAddCredencialesComponent, {
      data: id,
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration
    })

    dialogRef.afterClosed().subscribe(
      () => {
        this.listarClientes();
      }
    )
  }

  openDialog2(enterAnimationDuration:string, exitAnimationDuration:string, id:number):void{
    const dialogRef = this.dialog.open(DialogEnviarCredencialesComponent, {
      data: id,
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration
    })

    dialogRef.afterClosed().subscribe(
      () => {
        this.listarClientes();
      }
    )
  }

  revalidarClientes():void{
    this.clienteService.revalidarCredenciales().subscribe(
      () => {
        this.listarClientes();
        Swal.fire(
          {
            text: 'Clientes actualizados',
            icon: 'success'
          }
        )
      }
    )
  }

}
