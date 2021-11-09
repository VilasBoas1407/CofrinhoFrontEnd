import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/req/login.service';
import { StorageService } from '../../../services/utils/storage.service';
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
  alertsDismiss: any = [];

  constructor(
    private formBuilder : FormBuilder,
    private LoginService : LoginService,
    private router : Router,
    private storageService: StorageService
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
      this.addAlert("Favor preencher os campos e-mail e senha!","warning");
      return;
    }
  
    let user = new UserLoginInput();
    user = this.loginForm.value;

    this.LoginService.AuthUser(user).subscribe(data =>{
      if(!IsNull(data.email) || !IsNull(data.token)){
        this.storageService.set('token',data.token);
        this.storageService.set('user',data);
        this.router.navigate(['home'])
      }
      else{
       this.addAlert("Usuário ou senha inválidos!", "danger");
      }
    },ex =>{
      this.addAlert(ex.error, "danger");
    });

  }


  addAlert(msg: string, type: string): void {
    this.alertsDismiss.push({
      type: type,
      msg: msg,
      timeout: 5000
    });
  }

}
