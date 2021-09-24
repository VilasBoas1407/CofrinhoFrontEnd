import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html'
})
export class TiposComponent implements OnInit {

  @ViewChild('myModal') public myModal: ModalDirective;
  
  constructor() { }

  ngOnInit(): void {
  }

}
