import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private token: string = '';
  public headers: HttpHeaders = new HttpHeaders;

  constructor(private authenticationService: AuthenticationService) {

    if (this.authenticationService.getItem('token') != null) {
      this.token = this.authenticationService.getItem('token').token;
      this.headers = new HttpHeaders(
        {
          'Content-type': 'application/json',
          'Authorization': `${this.token}`
        }
      );
    }

  }


}
