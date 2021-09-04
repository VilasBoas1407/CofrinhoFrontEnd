import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/req/login.service';
import UserLoginInput from '../../../shared/models/User/Input/UserLoginInput';
import { IsNull } from '../../../shared/validators/utils';

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
  ){


  }

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


    if(this.loginForm.status == "INVALID")
    {
      console.log("error")
      return;
    }
  

    let user = new UserLoginInput();
    user = this.loginForm.value;

    this.LoginService.AuthUser(user).subscribe(data =>{
      if(!IsNull(data.email) || !IsNull(data.token)){
        console.log("Bem vindo")
      }
      else{
        console.log("Login Inválido!")
      }
    },ex =>{
      console.log("Error")
    });

  }

  forgotPassword(){
    this.router.navigate(['recuperar-senha'])
  }


}
