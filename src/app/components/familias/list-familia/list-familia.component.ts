import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Familias } from 'src/app/models/familias';
import { FamiliasService } from 'src/app/services/familias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-familia',
  templateUrl: './list-familia.component.html',
  styleUrls: ['./list-familia.component.css']
})
export class ListFamiliaComponent {

  displayedColumns: string[] = ['Codigo', 'Descripcion', 'Nomenclatura', 'Accion'];
  dataSource: Familias[] = [];

  constructor(private familiasService: FamiliasService, private router:Router) {
  }

  ngOnInit(): void {
    this.getFamilias();
  }

  getFamilias(): void {
    this.familiasService.getAllFamilias().subscribe(
      data => {
        this.dataSource = data;
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
