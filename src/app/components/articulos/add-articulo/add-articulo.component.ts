import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Articulos } from 'src/app/models/articulos';
import { Familias } from 'src/app/models/familias';
import { Subfamilias } from 'src/app/models/subfamilias';
import { ArticulosService } from 'src/app/services/articulos.service';
import { FamiliasService } from 'src/app/services/familias.service';
import { SubfamiliasService } from 'src/app/services/subfamilias.service';

@Component({
  selector: 'app-add-articulo',
  templateUrl: './add-articulo.component.html',
  styleUrls: ['./add-articulo.component.css']
})
export class AddArticuloComponent implements OnInit{

  descripcion:string = '';
  presentacion:string = '';
  familiaId:number = -1;
  subFamiliaId:number = -1;

  familias:Familias[] = [];
  subFamilias:Subfamilias[] = [];

  constructor(private familiasService:FamiliasService, private subFamiliasService:SubfamiliasService, private articulosService:ArticulosService, private toastr:ToastrService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.getFamilias();
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

  addArticulos():void{
    let arti:Articulos = {
      descripcion: this.descripcion,
      presentacion: this.presentacion,
      familiasDto: {
        id: this.familiaId
      },
      subFamiliasDto: {
        id: this.subFamiliaId
      }
    }

    this.articulosService.addArticulos(arti).subscribe(
      () => {
        this.router.navigate(['/articulos']);
        this.toastr.success('Articulo agregado de manera correcta', 'Articulo Agregado');
      }
    );
  }
}
