import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TipoDespesaService } from '../../../services/req/tipo-despesa.service';
import { StorageService } from '../../../services/utils/storage.service';
import TipoDespesaDTO from '../../../shared/models/TipoDespesa/DTO/TipoDespesaDTO';
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
        IdTipo: "",
        Nome : ["", Validators.compose([Validators.required])],
        Descricao : [""],
        Tipo : ["0", Validators.compose([Validators.required])],
        Action: "Register"
      }
    );

  }

  submit(){

    if(this.tipoDespesaForm.status == "INVALID"){
      this.addAlert("Favor preencher todos os campos!","warning");
      return;
    }

    let tipoDespesa = new TipoDespesaInput();
    tipoDespesa = {...this.tipoDespesaForm.value};
    const Action = this.tipoDespesaForm.value.Action;

    if(this.tipoDespesaForm.value.Tipo == "1")
      tipoDespesa.IsDespesa = true;
    else
      tipoDespesa.IsDespesa = false;

    const userData = this.storageService.get('user');
    tipoDespesa.IdUsuario = String(userData.id);



    console.log("Oi")
    if(Action == "Register"){
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
    else{
      tipoDespesa.Id = this.tipoDespesaForm.value.IdTipo;
      this.TipoDespesaService.AtualizarTipoDespesa(tipoDespesa).subscribe(data =>{
        if(data){
          this.addAlert("Tipo atualizado com sucesso!","success")
          this.registerModal.hide();
          this.getAll();
        }
  
      }, ex => {
        this.addAlert(ex.error, "danger")
      });
    }

    //Limpa o formulário
    this.tipoDespesaForm.setValue({
      IdTipo : null,
      Nome: null,
      Descricao: null,
      Tipo: "1",
      Action: "Register"
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

  update(tipoDespesa : TipoDespesaDTO){
    this.registerModal.show();
    this.tipoDespesaForm.setValue({
      IdTipo : tipoDespesa.id,
      Nome: tipoDespesa.nome,
      Descricao: tipoDespesa.descricao,
      Tipo: tipoDespesa.isDespesa ? "1" : "0",
      Action: "Update"
    }); 
  }

}
