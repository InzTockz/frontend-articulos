import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-cargar-credenciales',
  templateUrl: './dialog-cargar-credenciales.component.html',
  styleUrls: ['./dialog-cargar-credenciales.component.css']
})
export class DialogCargarCredencialesComponent implements OnInit{

  archivo!:File;
  pendiente:boolean = false;

  constructor(private clienteService:ClienteService, private toastr:ToastrService,
    public dialogRef:MatDialogRef<DialogCargarCredencialesComponent>
  ){}

  ngOnInit(): void {
    
  }

  cargarArchivoSeleccionado(event:Event):void{
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      this.archivo = input.files[0];
    }
  }

  actualizarCredenciales():void{
    this.pendiente = false;
    this.clienteService.cargarCredencilesPortal(this.archivo).subscribe(
      () => {
        Swal.fire({
          title: 'Completado',
          icon: 'success'
        }).then(response => {
          if(response.isConfirmed || response.isDismissed){
            this.dialogRef.close();
            this.pendiente = true;
          }
        })
      }
    )
  }
}
