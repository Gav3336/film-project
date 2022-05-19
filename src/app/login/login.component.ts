import { Component, OnInit } from '@angular/core';
import { DatiService } from '../comune/dati-service.service';
import { Account } from '../comune/account';
import { Favourites } from '../comune/favourites';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nome: String = "";
  pwd: String = "";

  // status: serve per capire cosa far vedere (0: login Form, 1: signup Form, 2: forgot Form, 3 error)
  status: number = 0;

  username: String = "";
  password: String = "";

  messaggio: String = "";
  esistenza: boolean = false;
  accountData: Account[] = [];

  accountValido: boolean = true;
  FavouriteFilm: Favourites[] = [];

  constructor(private servizio: DatiService) {
  }

  validazione() {

    if (this.servizio.getAccountUsername(0) == this.nome && this.servizio.getAccountPassword(0) == this.pwd) {
      this.status = 99;
    } else {
      for (let i = 0; i < this.servizio.getAccountNumber(); i++) {
        if (this.servizio.getAccountUsername(i) == this.nome && this.servizio.getAccountPassword(i) == this.pwd) {
          this.esistenza = true;
        }
      }

      if (this.esistenza) {
        this.status = 2;
        this.messaggio = "hai eseguito il login"
        console.log(this.messaggio);
        this.servizio.Logged();
        this.servizio.getLoggedAccount(this.nome);
      } else {
        this.messaggio = "account non presente"
        console.log(this.messaggio);
      }
    }
  }

  setStatus(valore: number) {
    this.status = valore;
  }

  controlloRegistrazione() {

    for (let i = 0; i < this.servizio.getAccountNumber(); i++) {
      if (this.servizio.getAccountUsername(i) == this.username) {
        this.accountValido = false;
      }
    }

    if (this.accountValido == false) {
      this.messaggio = "errore: account con username uguale già presente"
      console.log(this.messaggio);

      // } else if (this.nome == "" || this.pwd == "") {
      //   this.messaggio = "errore: valori inseriti non validi"
    } else {
      this.registrazione();
      this.nome = "";
      this.pwd = "";
    }
  }

  registrazione() {
    this.servizio.addAccount(this.username, this.password);
    console.log(this.servizio.accountCollector);
  }

  addAccountData() {
    for (let i = 0; i < this.servizio.getAccountNumber(); i++) {
      this.accountData.push(new Account());
      this.accountData[i].userName = this.servizio.getAccountUsername(i);
      this.accountData[i].password = this.servizio.getAccountPassword(i);
    }
  }

  getFavouriteFilm() {
    for (let i = 0; i < this.servizio.getFavouriteFilmNumber(); i++) {
      this.FavouriteFilm.push(new Favourites());
      
    }

    console.log(this.FavouriteFilm);
  }

  ngOnInit() { 
    if(this.servizio.getLogged()){
      this.status = 2;
      this.getFavouriteFilm();
    }
  }
}
