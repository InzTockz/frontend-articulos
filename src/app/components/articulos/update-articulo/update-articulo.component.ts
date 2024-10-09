import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Familias } from 'src/app/models/familias';
import { Subfamilias } from 'src/app/models/subfamilias';
import { ArticulosService } from 'src/app/services/articulos.service';
import { FamiliasService } from 'src/app/services/familias.service';
import { SubfamiliasService } from 'src/app/services/subfamilias.service';

@Component({
  selector: 'app-update-articulo',
  templateUrl: './update-articulo.component.html',
  styleUrls: ['./update-articulo.component.css']
})
export class UpdateArticuloComponent implements OnInit {

  descripcion:string = '';
  presentacion:string = '';
  familiaId:number = -1;
  subFamiliaId:number = -1;

  familias:Familias[] = [];
  subFamilias:Subfamilias[] = [];

  constructor(private familiasService:FamiliasService, private subFamiliasService:SubfamiliasService, private articulosService:ArticulosService, private toastr:ToastrService,
    private router:Router, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.getFamilias();
    this.getArticulos();
  }

  getFamilias():void{
    this.familiasService.getAllFamilias().subscribe(
      data => this.familias = data
    )
  }

  getSubFamilias(event:any):void{
    let id = event.value;
    console.log(id)
    this.subFamiliasService.getSubFamiliasByFamilias(id).subscribe(
      data => this.subFamilias = data
    )
  }

  getArticulos():void{
    this.route.params.subscribe(
      p => {
        let id = p['id'];
        this.articulosService.getIdArticulos(id).subscribe(
          data => {
            this.presentacion = data.presentacion!;
            this.descripcion = data.descripcion!;
            this.familiaId = data.familiasDto?.id!;
            this.subFamiliaId = data.subFamiliasDto?.id!;

            this.subFamiliasService.getSubFamiliasByFamilias(data.familiasDto?.id!).subscribe(
              data => this.subFamilias = data
            )
          }
        );
      }
    );
  }

  updateArticulos():void{

  }
}
