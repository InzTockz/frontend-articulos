import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Familias } from 'src/app/models/familias';
import { Subfamilias } from 'src/app/models/subfamilias';
import { FamiliasService } from 'src/app/services/familias.service';
import { ReportesService } from 'src/app/services/reportes.service';
import { SubfamiliasService } from 'src/app/services/subfamilias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subfamilias-reporte',
  templateUrl: './subfamilias-reporte.component.html',
  styleUrls: ['./subfamilias-reporte.component.css']
})
export class SubfamiliasReporteComponent implements OnInit {

  familia: Familias[] = [];
  dataSource: Subfamilias[] = [];
  indice: string[] = ['Codigo', 'Descripcion', 'Nomenclatura'];

  familiaControl = new FormControl<Familias | null>(null, Validators.required);

  idFamilia: any;

  constructor(private subFamiliaService: SubfamiliasService, private familiaService: FamiliasService, private reporteSubFamiliaService: ReportesService) { }

  ngOnInit(): void {
    this.getFamilias();
  }

  getFamilias(): void {
    this.familiaService.getAllFamilias().subscribe(
      data => {
        this.familia = data;
      }
    )
  }

  getSubFamilias(): void {
    let id = this.idFamilia;
    if (id == 'all') {
      this.subFamiliaService.getAllSubFamilias().subscribe(
        data => {
          this.dataSource = data;
        }
      )
    } else if (id == undefined) {
      Swal.fire({
        text: 'No ha seleccionado la familia',
        icon: 'warning'
      });
    } else {
      let idFam: number = id;
      this.subFamiliaService.getSubFamiliasByFamilias(idFam).subscribe(
        data => {
          this.dataSource = data;
        }
      );
    }
  }

  reporteSubFamilia(): void {

    if (this.idFamilia != 'all') {
      let idFam: number = this.idFamilia
      this.reporteSubFamiliaService.reporteSubFamiliasPorFamilia(this.idFamilia).subscribe(
        response => {
          const url = window.URL.createObjectURL(response);
          const link = document.createElement('a');

          link.href = url;
          link.download = 'Reporte SubFamilias';

          link.click();

          Swal.fire({
            title: 'Reporte Generado',
            icon: 'success'
          })
        });
    } else {
      this.reporteSubFamiliaService.reporteSubFamilias().subscribe(
        response => {
          const url = window.URL.createObjectURL(response);
          const link = document.createElement('a');
          link.href = url;
          link.download = "Reporte SubFamlias";
          link.click();

          Swal.fire({
            title: 'Reporte Generado',
            icon: 'success'
          })
        });
    };
  }
}
