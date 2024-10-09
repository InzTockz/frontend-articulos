import { Component, OnInit } from '@angular/core';
import { Articulos } from 'src/app/models/articulos';
import { ArticulosService } from 'src/app/services/articulos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-articulo',
  templateUrl: './list-articulo.component.html',
  styleUrls: ['./list-articulo.component.css']
})
export class ListArticuloComponent implements OnInit{

  articulos:Articulos[] = [];
  columnasArticulos:string[] = ['Nro. Articulo', 'Descripcion', 'Presentacion', 'Familia', 'SubFamilia', 'Fec. Creacion', 'Accion'];

  constructor(private articulosService:ArticulosService){}

  ngOnInit(): void {
    this.getArticulos();
  }

  getArticulos():void{
    this.articulosService.getAllArticulos().subscribe(
      data => this.articulos = data
    )
  }

  deleteArticulos(id:number):void{

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
