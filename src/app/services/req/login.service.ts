import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { apiUrl,httpOptions } from "../../shared/api";

import UserLoginInput from '../../shared/models/User/Input/UserLoginInput';
import LoginUserResponse from '../../shared/models/User/Response/LoginUserResponse';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private httpClient: HttpClient) {}
  
  public AuthUser(user : UserLoginInput) : Observable<LoginUserResponse>{
    return this.httpClient.post<LoginUserResponse>(
      apiUrl + 'auth/login',
      user,
      httpOptions
    );
  }
  
}
