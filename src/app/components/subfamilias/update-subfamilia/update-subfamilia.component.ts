import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Familias } from 'src/app/models/familias';
import { Subfamilias } from 'src/app/models/subfamilias';
import { FamiliasService } from 'src/app/services/familias.service';
import { SubfamiliasService } from 'src/app/services/subfamilias.service';

@Component({
  selector: 'app-update-subfamilia',
  templateUrl: './update-subfamilia.component.html',
  styleUrls: ['./update-subfamilia.component.css']
})
export class UpdateSubfamiliaComponent implements OnInit{

  codigo:string = '';
  descripcion:string = '';
  familiaId:number = 0;

  familias:Familias[] = [];

  constructor(private subFamiliasService:SubfamiliasService, private familiasService:FamiliasService, private toastr:ToastrService, private router:Router, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.getFamilias();
    this.getSubFamiliasId();
  }

  getFamilias():void{
    this.familiasService.getAllFamilias().subscribe(
      data => this.familias = data
    )
  }

  getSubFamiliasId():void{
    this.route.params.subscribe(
      data => {
        let id = data['id'];
        this.subFamiliasService.getIdSubFamilias(id).subscribe(
          data => {
            this.codigo = data.codigo!,
            this.descripcion = data.descripcion!,
            this.familiaId = data.familias!.id!
          }
        )
      }
    )
  }

  updateSubFamilias():void{
    this.route.params.subscribe(
      data => {
        let id = data['id'];

        let subFami:Subfamilias = {
          id: id,
          codigo: this.codigo,
          descripcion: this.descripcion,
          familias: {
            id: this.familiaId
          }
        }

        this.subFamiliasService.updateSubFamilias(id, subFami).subscribe(
          () => {
            this.router.navigate(['/subfamilias']);
            this.toastr.success('SubFamilia actualizada de manera correcta', 'Actualizacion Correcta')
          }
        )
      }
    )
  }

}
