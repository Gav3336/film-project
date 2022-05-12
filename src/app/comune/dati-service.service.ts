import { Injectable } from '@angular/core';
import { Account } from '../comune/account';


@Injectable({
  providedIn: 'root'
})
export class DatiService {

  accountCollector: Account[] = [];
  contAccount: number = 0;
  lastSearch: String = "";

  logged: boolean = false;

  constructor() { }

  addAccount(username: String, password: String){
    this.accountCollector.push(new Account());
    this.accountCollector[this.contAccount].userName = username;
    this.accountCollector[this.contAccount].password = password;
    this.contAccount++;
  }
  
  getAccount(id: number){
    return this.accountCollector[id];
  }

  getAccountUsername(id: number){
    return this.accountCollector[id].userName;
  }

  getAccountPassword(id: number){
    return this.accountCollector[id].userName;
  }

  getAccountNumber(){
    return this.contAccount;
  }

  Logged(){
    this.logged = true;
  }

  getLogged(){
    return this.logged;
  }
}
