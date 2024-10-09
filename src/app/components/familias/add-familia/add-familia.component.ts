import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Familias } from 'src/app/models/familias';
import { FamiliasService } from 'src/app/services/familias.service';

@Component({
  selector: 'app-add-familia',
  templateUrl: './add-familia.component.html',
  styleUrls: ['./add-familia.component.css']
})
export class AddFamiliaComponent implements OnInit{

  familia:Familias = new Familias();

  constructor(private familiasService:FamiliasService, private router:Router, private toastr:ToastrService){}

  ngOnInit(): void {
  }

  addFamilia():void{
    this.familiasService.saveFamilias(this.familia).subscribe(
      () => {
        this.router.navigate(['/familias']);
        this.toastr.success("Familia registrada de manera correcta", "Registro correcto");
      }
    );
  }
}
