import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FilmClass } from '../comune/film-class';
import { DatiService } from '../comune/dati-service.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  url;
  urlWiki;

  mostra: boolean;

  vettoriDati: any;
  vettoriWiki: any;

  FilmCollector: FilmClass[] = [];

  nomeFilm: String = "";

  infoFilm: boolean = false;
  position: number = 0;

  logged: boolean = false;

  constructor(private miohttp: HttpClient, private servizio: DatiService) {
    this.url = "";
    this.urlWiki = "";
    this.mostra = false;
   }

  ngOnInit(): void {
    this.mostra = false;
    this.chiamaDatiFilm();
  }

  chiamaDatiFilm() {
    this.url = 'https://imdb-api.com/it/API/Search/k_hp5e67w2/' + this.nomeFilm;
    this.mostra = false;
    this.miohttp.get(this.url).subscribe((dati) => {
      console.log(dati);
      this.vettoriDati = dati;
      this.mostra = true;

      this.fillCollector();
      this.setLogged()
      console.log(this.logged);
    });
  }

  fillCollector() {
    for (let i = 0; i < this.vettoriDati.results.length; i++) {
      this.FilmCollector.push(new FilmClass());
      this.FilmCollector[i].title = this.vettoriDati.results[i].title;
      this.FilmCollector[i].image = this.vettoriDati.results[i].image;
      this.FilmCollector[i].id = this.vettoriDati.results[i].id;
      this.FilmCollector[i].year = this.vettoriDati.results[i].description.substring(0, 6);
    }
  }

  infoToggler(){
    this.infoFilm = !this.infoFilm;
  }

  controlloLogin(){
    if(this.servizio.getLogged()){
      this.infoFilm = true;
    }else{
      this.infoFilm = false;
    }
  }

  setLogged(){
    if(this.servizio.getLogged()){
      this.logged = this.servizio.getLogged()
    }
  }

  addFavourite(id: number){
    this.servizio.addFavouriteFilm(this.FilmCollector[id]);
  }

}
