import { Subfamilias } from 'src/app/models/subfamilias';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Familias } from 'src/app/models/familias';
import { FamiliasService } from 'src/app/services/familias.service';
import { SubfamiliasService } from 'src/app/services/subfamilias.service';

@Component({
  selector: 'app-add-subfamilia',
  templateUrl: './add-subfamilia.component.html',
  styleUrls: ['./add-subfamilia.component.css']
})
export class AddSubfamiliaComponent implements OnInit{

  familias:Familias[] = [];

  codigo:string = '';
  descripcion:string = '';
  familiaId:number = 0;

  constructor(private subFamiliasService:SubfamiliasService, private familiasService:FamiliasService, private toastr:ToastrService, private router:Router){}

  ngOnInit(): void {
    this.getFamilias();
  }

  getFamilias():void{
    this.familiasService.getAllFamilias().subscribe(
      data => this.familias = data
    )
  }

  addSubFamilias():void{

    let subFami:Subfamilias = {
      codigo: this.codigo,
      descripcion: this.descripcion,
      familias: {
        id: this.familiaId
      }
    }

    this.subFamiliasService.addSubFamilias(subFami).subscribe(
      () => {
        this.router.navigate(['/subfamilias']);
        this.toastr.success('Producto registrado de manera correcta', 'Registro correcto')
      }
    )
  }

}
