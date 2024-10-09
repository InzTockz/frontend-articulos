import { FamiliasService } from './../../../services/familias.service';
import { Component, OnInit } from '@angular/core';
import { Subfamilias } from 'src/app/models/subfamilias';
import { SubfamiliasService } from 'src/app/services/subfamilias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-subfamilia',
  templateUrl: './list-subfamilia.component.html',
  styleUrls: ['./list-subfamilia.component.css']
})
export class ListSubfamiliaComponent implements OnInit{

  dataSource:Subfamilias[] = [];
  displayedColumns:string[] = ['Codigo', 'Descripcion', 'Familia', 'Accion'];

  constructor(private subFamiliasService:SubfamiliasService, private familiaService:FamiliasService){}

  ngOnInit(): void {
    this.getSubFamilias();
  }

  getSubFamilias():void{
    this.subFamiliasService.getAllSubFamilias().subscribe(
      data => {
        this.dataSource = data;
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
}
