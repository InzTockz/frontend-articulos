import { NgFor } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Event } from '@angular/router';
import { Articulos } from 'src/app/models/articulos';
import { Color } from 'src/app/models/color';
import { Etiquetas } from 'src/app/models/etiquetas';
import { Familias } from 'src/app/models/familias';
import { Subfamilias } from 'src/app/models/subfamilias';
import { TiempoVida } from 'src/app/models/tiempo-vida';
import { ArticulosService } from 'src/app/services/articulos.service';
import { ColorService } from 'src/app/services/color.service';
import { EtiquetasService } from 'src/app/services/etiquetas.service';
import { FamiliasService } from 'src/app/services/familias.service';
import { SubfamiliasService } from 'src/app/services/subfamilias.service';
import { TiempoVidaService } from 'src/app/services/tiempo-vida.service';
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
  etiquetaId: number = 40;
  colorId: number = 7;
  etapa!: string;
  descripcionEtapa!: string;
  dosis!: string;
  tiempoVidaId: number = 7;
  hiddenMoreInformation: boolean = false;

  familias: Familias[] = [];
  subFamilias: Subfamilias[] = [];
  etiquetas: Etiquetas[] = [];
  colores: Color[] = [];
  tiempoVida: TiempoVida[] = [];
  contenido: Articulos[] = [];
  encabezado: string[] = ['Nombre', 'Presentacion', 'Familia', 'SubFamilia', 'Cod. Etiqueta', 'Color Nucleo', 'Etapa',
    'Descripcion', 'Dosis', 'T. Vida', 'Accion'];

  @ViewChild(MatTable) table: MatTable<Articulos> | null = null;
  @ViewChild('formValid') formValid!: NgForm;

  constructor(public dialogRef: MatDialogRef<DialogAddArticuloComponent>, private familiaService: FamiliasService, private subFamiliaService: SubfamiliasService,
    private articulosService: ArticulosService, private colorService: ColorService, private etiquetaService: EtiquetasService, private tiempoVidaService: TiempoVidaService

  ) { }

  ngOnInit(): void {
    this.getFamilias();
    this.getEtiquetas();
    this.getColores();
    this.getTiempoVida();
  }

  getFamilias(): void {
    this.familiaService.getAllFamilias().subscribe(
      fam => this.familias = fam
    );
  }

  getEtiquetas(): void {
    this.etiquetaService.getEtiquetas().subscribe(
      data => this.etiquetas = data
    );
  }

  getColores(): void {
    this.colorService.getArticulos().subscribe(
      data => this.colores = data
    );
  }

  getTiempoVida(): void {
    this.tiempoVidaService.getTiempoVida().subscribe(
      data => this.tiempoVida = data
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
        let objFami = response.descripcion;

        this.subFamiliaService.getIdSubFamilias(this.subFamiliaId).subscribe(
          response => {
            let objSubFami = response.descripcion;

            this.etiquetaService.getEtiquetasId(this.etiquetaId).subscribe(
              response => {
                let objEtiqueta = response.codigo != '00' ? response.codigo : '';

                this.colorService.getArticulosId(this.colorId).subscribe(
                  response => {
                    let objColor = response.codigo != '00' ? response.descripcion : '';

                    this.tiempoVidaService.getTiempoVidaId(this.tiempoVidaId).subscribe(
                      response => {
                        let objTiempoVida = response.codigo != '00' ? response.descripcion : '';

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
                          },
                          etiquetaDto: {
                            id: this.etiquetaId,
                            codigo: objEtiqueta
                          },
                          colorDto: {
                            id: this.colorId,
                            descripcion: objColor
                          },
                          etapa: this.etapa,
                          descripcionEtapa: this.descripcionEtapa,
                          dosis: this.dosis,
                          tiempoVidaDto: {
                            id: this.tiempoVidaId,
                            descripcion: objTiempoVida
                          }
                        }
                        console.log(articulo)
                        this.contenido.push(articulo);
                        this.table!.renderRows();
                        this.formValid.reset();

                        this.etiquetaId = 40;
                        this.colorId = 7;
                        this.etapa = ''
                        this.descripcionEtapa = '';
                        this.dosis = '';
                        this.tiempoVidaId = 7;

                      }) // FIN DE TIEMPO VIDA SERVICE
                  }) // FIN DE COLOR SERVICE
              }); //FIN DE ETIQUETA SERVICE
          }); //FIN DE SUBFAMILIA SERVICE
      }); //FIN DE FAMILIA SERVICE
  }

  deleteArticuloTemp(index: number): void {
    this.contenido.splice(index, 1);
    this.table!.renderRows();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  registrarArticulos(): void {
    if (this.contenido.length == 0) {
      Swal.fire({
        title: 'MENSAJE',
        text: 'La lista de articulos esta vacia.',
        icon: 'warning'
      })
    } else {
      this.articulosService.addArticulos(this.contenido).subscribe(
        response => {
          Swal.fire({
            text: '' + response,
            icon: 'success'
          })
          this.dialogRef.close();
        }
      );
    }
  }

  cleanAfterHidden(): void {
    if (!this.hiddenMoreInformation) {
      this.etiquetaId = 40;
      this.colorId = 7;
      this.etapa = ''
      this.descripcionEtapa = '';
      this.dosis = '';
      this.tiempoVidaId = 7;
    }
  }
}
