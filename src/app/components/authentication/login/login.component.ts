import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/models/login';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = new Login();

  constructor(private authenticationService: AuthenticationService, private toastr: ToastrService, private router: Router, private usersService: UsersService,
    userService: UsersService
  ) { }

  ngOnInit(): void {

  }

  accessLogin(): void {
    this.authenticationService.login(this.login).subscribe(
      token => {

        if (token.status === 'aprobado') {
          this.authenticationService.setItem('token', token);
          this.router.navigate(['/']);
          this.toastr.success('', 'Bienvenido');
        } else if (token.status === 'denegado') {
          this.toastr.error('Credenciales incorrectas', 'Acceso denegado');
          this.login.password = '';
        }
      });
  }
}
