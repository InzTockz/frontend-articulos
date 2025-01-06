import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private authenticationService: AuthenticationService) {
  }

  getHeader(){
    const token = this.authenticationService.getItem('token').token;
    return new HttpHeaders(
      {
        'Authorization': `${token}`
      }
    )
  }

}
