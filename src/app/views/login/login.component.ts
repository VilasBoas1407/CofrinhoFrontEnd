import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/req/login.service';
import UserLoginInput from '../../shared/models/User/Input/UserLoginInput';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{ 

  ngOnInit(){
    this.initForm();
  }

  loginForm : FormGroup;

  constructor(

    private formBuilder : FormBuilder,
    private LoginService : LoginService,
    private router : Router,
    private activedRoute: ActivatedRoute,

  ){}

  initForm(){

    this.loginForm = this.formBuilder.group({
      
      Email: [
        "", 
      Validators.compose([
        Validators.required,
        Validators.email,
      ])],

      Password:["", 
        Validators.compose([
          Validators.required
        ])]
    });

  }
  
  submit(){
    console.log("Oi")
    console.log(this.loginForm)
    let user = new UserLoginInput();

    this.LoginService.AuthUser(user).subscribe(data =>{});

  }

  forgotPassword(){
    this.router.navigate(['recuperar-senha'])
  }

}
