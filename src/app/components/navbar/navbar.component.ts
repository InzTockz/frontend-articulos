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

  constructor(private authenticationService:AuthenticationService, private router:Router, private toastr:ToastrService){}

  ngOnInit(): void {

  }

  logout():void{
    this.authenticationService.clear();
    this.router.navigate(['/login']);
    this.toastr.error('Session Finalizada');
  }

  isAdmin():boolean{
    const getRole = this.authenticationService.getItem('token').roleName;
    return getRole === 'ADMIN' ? true : false;
  }


}
