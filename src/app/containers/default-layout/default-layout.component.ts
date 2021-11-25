import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { StorageService } from '../../services/utils/storage.service';
import { PlanejamentoDTO, Meses } from '../../shared/models/Planejamento/DTO/PlanejamentoDTO';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit{

  @ViewChild('newPlanejamentoModal') public childModal: ModalDirective;

  meses = Meses;

  constructor( 
     private storageService: StorageService,
     private router : Router,){
  }
  
  ngOnInit(): void {
    console.log(this.meses)
  }

  public sidebarMinimized = false;
  public navItems = navItems;

  loginUsuarioParam = "Teste";

  change(){
    this.loginUsuarioParam = "Mudou"
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout(){
    this.storageService.clear();
    this.router.navigate([''])
  }

  SaveNewPlanejamento(){

  }
}


