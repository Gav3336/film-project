import { Injectable } from '@angular/core';
import { Account } from '../comune/account';
import { FilmClass } from '../comune/film-class';
import { Favourites } from './favourites';


@Injectable({
  providedIn: 'root'
})
export class DatiService {

  accountCollector: Account[] = [];
  FavouriteFilm: Favourites[] = [];

  contAccount: number = 1;
  lastSearch: String = "";
  loggedAccountPosition: number = -1;

  logged: boolean = false;

  constructor() { 
    this.adminAccount();
  }

  adminAccount(){
    this.accountCollector.push(new Account());
    this.accountCollector[0].userName = "admin";
    this.accountCollector[0].password = "cisco";
  }

  addAccount(username: String, password: String){
    this.accountCollector.push(new Account());
    this.accountCollector[this.contAccount].userName = username;
    this.accountCollector[this.contAccount].password = password;
    this.accountCollector[this.contAccount].userId = this.getRandomInt(0, 999999);
    this.contAccount++;
  }
  
  getAccount(id: number){
    return this.accountCollector[id];
  }

  getAccountUsername(id: number){
    return this.accountCollector[id].userName;
  }

  getAccountPassword(id: number){
    return this.accountCollector[id].password;
  }

  getIdUser(id: number){
    return this.accountCollector[id].userId;
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

  getRandomInt(min:number, max:number){
    return Math.floor((Math.random() * max) + min);
  }

  getLoggedAccount(userName: String){
    for(let i = 0; i < this.accountCollector.length; i++){
      if(userName == this.accountCollector[i].userName){
        this.loggedAccountPosition = i;
      }
    }
  }

  addFavouriteFilm(film: FilmClass){
    this.FavouriteFilm.push(new Favourites())
    this.FavouriteFilm[this.loggedAccountPosition].title = film.title;
    this.FavouriteFilm[this.loggedAccountPosition].image = film.image;
    this.FavouriteFilm[this.loggedAccountPosition].id = film.id
    this.FavouriteFilm[this.loggedAccountPosition].year = film.year
    this.FavouriteFilm[this.loggedAccountPosition].plotShort = film.plotShort;
    this.FavouriteFilm[this.loggedAccountPosition].plotfull = film.plotfull;
    this.FavouriteFilm[this.loggedAccountPosition].videoUrl = film.videoUrl;
  }

  addFavouriteComing(){
    
  }

  addFavouriteTio(){

  }

  getFavouriteFilm(){
    
  }

  getFavouriteFilmNumber(){
    return this.accountCollector.length
  }
}
