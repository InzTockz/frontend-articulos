import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Familias } from 'src/app/models/familias';
import { FamiliasService } from 'src/app/services/familias.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-familia',
  templateUrl: './update-familia.component.html',
  styleUrls: ['./update-familia.component.css']
})
export class UpdateFamiliaComponent implements OnInit {

  familia: Familias = new Familias();

  constructor(private familiaService: FamiliasService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getIdFamilias();
  }

  getIdFamilias(): void {
    this.route.params.subscribe(
      p => {
        let id = p['id'];
        if (id) {
          this.familiaService.getIdFamilias(id).subscribe(
            data => this.familia = data
          )
        }
      }
    );
  }

  updateFamilia(): void {

    this.familiaService.updateFamilias(this.familia.id!, this.familia).subscribe(
      () => {
        this.router.navigate(['/familias']);
        this.toastr.success('Familia actualidada de manera correcta', 'Actualizacion Correcta');
      }
    )
  }

}
