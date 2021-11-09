import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/req/login.service';
import UserRegisterInput from '../../../shared/models/User/Input/UserRegisterInput';
import { IsNull } from '../../../shared/validators/utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {


  ngOnInit() {
    this.initForm();
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  )  { }

  registerForm : FormGroup;
  alertsDismiss: any = [];;

  initForm() {

    this.registerForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(3)]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    })
    
  }


  submit(){

    let user = new UserRegisterInput();
    if(this.validateFields(this.registerForm, user)){ 
      this.loginService.RegisterUser(user).subscribe(data =>{
        this.router.navigate(['/login']);
      }, ex =>{
        this.addAlert(ex.error.message, 'danger');
      });
    }
    
  }

  validateFields(form: FormGroup, user: UserRegisterInput) : boolean {

    if(IsNull(form.value.Name)){
      this.addAlert('Nome é um campo obrigatório', 'danger');
      return false;
    }

    if(IsNull(form.value.Email)){
      this.addAlert('Email é um campo obrigatório', 'danger');
      return false;
    }
    if(IsNull(form.value.Password)){
      this.addAlert('Senha é um campo obrigatório', 'danger');
      return false;
    }

    if(form.value.Password.length < 6){
      this.addAlert('Senha deve ter no mínimo 6 caracteres', 'danger');
      return false;
    }

    if(form.value.Password != form.value.ConfirmPassword || IsNull(form.value.ConfirmPassword)){
      this.addAlert('As senhas não coincidem', 'danger');
      return false;
    }

    user.Name = form.value.Name;
    user.Email = form.value.Email;
    user.Password = form.value.Password;
  
    return true;
  }

  back(){
    this.router.navigate(['/login']);
  }

  addAlert(msg: string, type: string): void {
    this.alertsDismiss.push({
      type: type,
      msg: msg,
      timeout: 5000
    });
  }
}
