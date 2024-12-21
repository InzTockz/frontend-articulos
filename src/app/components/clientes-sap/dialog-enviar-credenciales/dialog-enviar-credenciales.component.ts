import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-enviar-credenciales',
  templateUrl: './dialog-enviar-credenciales.component.html',
  styleUrls: ['./dialog-enviar-credenciales.component.css']
})
export class DialogEnviarCredencialesComponent {

  correo!:string

  constructor(private clientesService: ClienteService, public dialogRef: MatDialogRef<DialogEnviarCredencialesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit(): void {

  }

  enviarCorreo():void{
    this.clientesService.enviarCredenciales(this.correo, this.data).subscribe(
      () => {
        this.dialogRef.close();
        Swal.fire({
          text: 'Correo enviado',
          icon: 'success'
        })
      }
    )
  }
}
