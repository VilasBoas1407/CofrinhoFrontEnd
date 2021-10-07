import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/utils/storage.service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {

  constructor( 
     private storageService: StorageService,
     private router : Router,){

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
}
