import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {


  constructor(public jwtHelper: JwtHelperService, public router: Router) {}
  
  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    if(token == null)
      return false;
    return !this.jwtHelper.isTokenExpired(token);
  }

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
