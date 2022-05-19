import { Component, OnInit } from '@angular/core';
import { DatiService } from '../comune/dati-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  constructor(private servizio: DatiService) {
  }

  ngOnInit(): void {
    console.log(this.servizio.getLogged());
    
  }

  getControlloLogin(){
    return this.servizio.getLogged();
  }

}
