import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CredencialesCliente } from 'src/app/models/credenciales-cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-add-credenciales',
  templateUrl: './dialog-add-credenciales.component.html',
  styleUrls: ['./dialog-add-credenciales.component.css']
})
export class DialogAddCredencialesComponent implements OnInit {

  credenciales:CredencialesCliente = new CredencialesCliente();

  constructor(private clientesService:ClienteService, public dialogRef:MatDialogRef<DialogAddCredencialesComponent>,
    @Inject(MAT_DIALOG_DATA) public data:number){}

  ngOnInit(): void {
    this.verCredenciales();
  }

  verCredenciales():void{
    this.clientesService.getClientesId(this.data).subscribe(
      data =>
      {
        this.credenciales.usuario = data.usuario_portal;
        this.credenciales.clave = data.clave_portal;
      });
  }

  agregarCredenciales():void{
    this.clientesService.addCredenciales(this.data, this.credenciales).subscribe(
      () => {
        this.dialogRef.close();
        Swal.fire({
          text: 'Datos ingresados correctamente',
          icon: 'success'
        });
      });
  }

}
