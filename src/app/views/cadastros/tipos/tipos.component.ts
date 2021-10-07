import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TipoDespesaService } from '../../../services/req/tipo-despesa.service';
import { StorageService } from '../../../services/utils/storage.service';
import TipoDespesaInput from '../../../shared/models/TipoDespesa/Input/TipoDespesaInput';
import TipoDespesaResponse from '../../../shared/models/TipoDespesa/Response/TipoDespesaResponse';
@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html'
})

export class TiposComponent implements OnInit {

  //Variáreis 
  tipoDespesaForm: FormGroup;
  alertsDismiss: any = [];
  listTipoDespesa : TipoDespesaResponse[];
  
  @ViewChild('registerModal') public registerModal: ModalDirective;
  
  constructor(
    private formBuilder: FormBuilder,
    private TipoDespesaService : TipoDespesaService,
    private storageService: StorageService

  ) { }

  ngOnInit(): void {
    this.getAll();
    this.initForm();
  }

  initForm(){
   
    this.tipoDespesaForm = this.formBuilder.group(
      {
        Nome : ["", Validators.compose([Validators.required])],
        Descricao : [""],
        Tipo : ["0", Validators.compose([Validators.required])],
      }
    );

  }

  submit(){

    if(this.tipoDespesaForm.status == "INVALID"){
      this.addAlert("Favor preencher todos os campos!","warning");
      return;
    }

    let tipoDespesa = new TipoDespesaInput();
    tipoDespesa = this.tipoDespesaForm.value;

    if(this.tipoDespesaForm.value.Tipo == "1")
      tipoDespesa.IsDespesa = true;
    else
      tipoDespesa.IsDespesa = false;

    const userData = this.storageService.get('user');
    tipoDespesa.IdUsuario = String(userData.id);

    this.TipoDespesaService.CadastrarNovoTipoDespesa(tipoDespesa).subscribe(data =>{
      if(data){
        this.addAlert("Novo tipo cadastrado com sucesso!","success")
        this.registerModal.hide();
        this.getAll();
      }

    }, ex => {
      this.addAlert(ex.error, "danger")
    });
  }

  getAll(){
    const userData = this.storageService.get('user');
    this.TipoDespesaService.GetTodosOsTiposDeDespesa(userData.id).subscribe(data =>{
        this.listTipoDespesa = data;
    }, ex =>{
      this.addAlert(ex.error, "danger")
    })
  }

  delete(id: string){
    this.TipoDespesaService.DeleteTipoDespesa(id).subscribe(data =>{
      this.getAll();
      this.addAlert(data.message, "success")
    }, ex => {
      this.addAlert(ex.error, "danger")
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
