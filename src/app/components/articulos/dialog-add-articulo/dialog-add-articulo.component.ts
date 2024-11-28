import { NgFor } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Event } from '@angular/router';
import { Articulos } from 'src/app/models/articulos';
import { Familias } from 'src/app/models/familias';
import { Subfamilias } from 'src/app/models/subfamilias';
import { ArticulosService } from 'src/app/services/articulos.service';
import { FamiliasService } from 'src/app/services/familias.service';
import { SubfamiliasService } from 'src/app/services/subfamilias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-add-articulo',
  templateUrl: './dialog-add-articulo.component.html',
  styleUrls: ['./dialog-add-articulo.component.css']
})
export class DialogAddArticuloComponent implements OnInit {

  descripcion!: string;
  presentacion!: string;
  familiaId!: number;
  subFamiliaId!: number;

  familias: Familias[] = [];
  subFamilias: Subfamilias[] = [];
  contenido: Articulos[] = [];
  encabezado: string[] = ['Descripcion', 'Presentacion', 'Familia', 'SubFamilia', 'Accion'];

  @ViewChild(MatTable) table: MatTable<Articulos> | null = null;
  @ViewChild('formValid') formValid!: NgForm;

  constructor(public dialogRef: MatDialogRef<DialogAddArticuloComponent>, private familiaService: FamiliasService, private subFamiliaService: SubfamiliasService,
    private articulosService:ArticulosService
  ) { }

  ngOnInit(): void {
    this.getFamilias();
  }

  getFamilias(): void {
    this.familiaService.getAllFamilias().subscribe(
      fam => this.familias = fam
    );
  }

  getSubFamiliasId(id: any): void {
    this.subFamiliaService.getSubFamiliasByFamilias(id).subscribe(
      subfam => this.subFamilias = subfam
    );
  }

  addArticuloTemp(): void {
    this.familiaService.getIdFamilias(this.familiaId).subscribe(
      response => {
        let objFami = response.descripcion!

        this.subFamiliaService.getIdSubFamilias(this.subFamiliaId).subscribe(
          response => {
            let objSubFami = response.descripcion!

            let articulo = {
              descripcion: this.descripcion,
              presentacion: this.presentacion,
              familiasDto: {
                id: this.familiaId,
                descripcion: objFami
              },
              subFamiliasDto: {
                id: this.subFamiliaId,
                descripcion: objSubFami
              }
            }
            this.contenido.push(articulo);
            this.table!.renderRows();

            this.formValid.reset();
          }
        )
      }
    )
  }

  deleteArticuloTemp(index: number): void {
    this.contenido.splice(index, 1);
    this.table!.renderRows();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  registrarArticulos():void{
    if(this.contenido.length == 0){
      Swal.fire({
        title: 'MENSAJE',
        text: 'La lista de articulos esta vacia.',
        icon: 'warning'
      })
    } else {
      this.articulosService.addArticulos(this.contenido).subscribe(
        response => {
          Swal.fire({
            text: ''+response,
            icon: 'success'
          })
          this.dialogRef.close();
        }
      );
    }
  }
}
