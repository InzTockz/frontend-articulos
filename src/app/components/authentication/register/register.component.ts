import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/models/users';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  users:Users = new Users();

  constructor(private usersService:UsersService, private router:Router, private toastr:ToastrService){}

  ngOnInit(): void {

  }

  register():void{
    this.usersService.register(this.users).subscribe(
      () => {
        this.router.navigate(['/login']);
        this.toastr.success('Espere la activación de su cuenta por parte de algun administrativo', 'Registro correcto')
      }
    )
  }
}
