import { NgFor } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Articulos } from 'src/app/models/articulos';

@Component({
  selector: 'app-dialog-add-articulo',
  templateUrl: './dialog-add-articulo.component.html',
  styleUrls: ['./dialog-add-articulo.component.css']
})
export class DialogAddArticuloComponent implements OnInit {

  articulo = {
    descripcion: '',
    presentacion: '',
    familiasDto: {
      id: 1,
      descripcion: ''
    },
    subFamiliasDto: {
      id: 1,
      descripcion: ''
    }
  }

  contenido:Articulos[] = [];
  encabezado:string[] = ['Descripcion', 'Presentacion', 'Familia', 'SubFamilia', 'Accion'];

  @ViewChild(MatTable) table: MatTable<Articulos> | null = null;

  constructor(public dialogRef: MatDialogRef<DialogAddArticuloComponent>){}

  ngOnInit(): void {
  }

  addArticuloTemp():void{
    this.contenido.push(this.articulo);
    console.log('Articulo registrado:', this.contenido);
    this.table!.renderRows();
    this.articulo = {descripcion: '', presentacion: '', familiasDto: {id: 0, descripcion: ''}, subFamiliasDto: {id: 0, descripcion: ''}}
  }
}
