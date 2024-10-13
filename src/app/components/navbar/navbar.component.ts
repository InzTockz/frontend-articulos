import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  userName:string = 'Fredy';

  constructor(private authenticationService:AuthenticationService, private router:Router, private toastr:ToastrService){}

  ngOnInit(): void {

  }

  logout():void{
    this.router.navigate(['/login']);
    this.authenticationService.removeItem('token');
    this.toastr.error('Session Finalizada');
    console.log(this.authenticationService.getItem('token'));
  }

  isAdmin():boolean{
    const getRole = this.authenticationService.getItem('token').roleName;
    return getRole === 'ADMIN' ? true : false;
  }


}
