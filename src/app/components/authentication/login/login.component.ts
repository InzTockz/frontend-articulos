import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/models/login';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  login:Login = new Login();

  constructor(private authenticationService:AuthenticationService, private toastr:ToastrService, private router:Router, private usersService:UsersService){}

  ngOnInit(): void {

  }

  accessLogin():void{
    this.authenticationService.login(this.login).subscribe(
      token => {

          this.authenticationService.setItem('token', token);

          this.router.navigate(['/']);
          this.toastr.success('Bienvenido ', 'Ingreso Correcto');
      }
    );
  }

}
