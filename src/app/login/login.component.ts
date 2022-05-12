import { Component, OnInit } from '@angular/core';
import { DatiService } from '../comune/dati-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nome: String = "";
  pwd: String = "";
  validato: String;
  // status: serve per capire cosa far vedere (0: login Form, 1: signup Form, 2: forgot Form, 3 error)
  status: number = 0;
  presenzaUsername: boolean = false;

  username: String = "";
  password: String = "";

  messaggio: String = "";
  esistenza: boolean = false;

  constructor(private servizio: DatiService) {
    this.validato = 'Inserire credenziali';
  }

  validazione() {
    for (let i = 0; i < this.servizio.getAccountNumber(); i++) {
      if (this.servizio.getAccountUsername(i) == this.nome && this.servizio.getAccountPassword(i) == this.pwd) {
        this.esistenza = true;
      }
    }

    if (this.esistenza) {
      this.messaggio = "hai eseguito il login"
      console.log("hai eseguito il login");
      this.servizio.Logged();
    }else{
      this.messaggio = "account non presente"
      console.log("account non presente");
    }
  }

  setStatus(valore: number) {
    this.status = valore;
  }

  controlloAccount() {
    for (let i = 0; i < this.servizio.getAccountNumber(); i++) {
      if (this.servizio.getAccountUsername(i) == this.username) {
        this.presenzaUsername = true;
      }
    }
    if (this.presenzaUsername == true) {
      this.messaggio = "errore: account con username uguale già presente"
      console.log(this.messaggio);
    } else {
      this.registrazione();
    }
  }

  registrazione() {
    this.servizio.addAccount(this.username, this.password);
    console.log(this.servizio.accountCollector);
  }

  ngOnInit() { }
}
