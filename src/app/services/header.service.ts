import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private authenticationService: AuthenticationService) {

    /*
    if (this.authenticationService.getItem('token') != null) {
      const token = this.authenticationService.getItem('token').token || '';
      this.headers = new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      );
    }*/

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
