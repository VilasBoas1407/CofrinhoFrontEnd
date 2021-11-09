import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { apiUrl,httpOptions } from "../../shared/api";
import { MessageResponse } from '../../shared/models/Default/DefaultResponse';

import UserLoginInput from '../../shared/models/User/Input/UserLoginInput';
import UserRegisterInput from '../../shared/models/User/Input/UserRegisterInput';
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

  public RegisterUser(user: UserRegisterInput) : Observable<MessageResponse>{
    return this.httpClient.post<MessageResponse>(
      apiUrl + 'auth/register',
      user,
      httpOptions
    );
  }
  
}
