import { Component, OnInit } from '@angular/core';
import { FilmSoon } from '../comune/film-soon';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-comingsoon',
  templateUrl: './comingsoon.component.html',
  styleUrls: ['./comingsoon.component.css']
})
export class ComingsoonComponent implements OnInit {
  url;
  urlWiki;

  mostra: boolean;

  vettoriDati: any;
  vettoriWiki: any;

  FilmCollector: FilmSoon[] = [];

  nomeFilm: String = "test";

  infoFilm: boolean = false;
  FilmID: String = "";

  constructor(private miohttp: HttpClient) {
    this.url = "";
    this.urlWiki = "";
    this.mostra = false;
   }

  ngOnInit(): void {
    this.mostra = false;
    this.chiamaDatiFilm();
  }

  chiamaDatiFilm() {
    this.url = 'https://imdb-api.com/it/API/ComingSoon/k_nrhizwhl/';
    this.mostra = false;
    this.miohttp.get(this.url).subscribe((dati) => {
      console.log(dati);
      this.vettoriDati = dati;
      this.mostra = true;

      this.fillCollector();
      
    });
  }

  fillCollector() {
    for (let i = 0; i < this.vettoriDati.items.length; i++) {
      this.FilmCollector.push(new FilmSoon());
      this.FilmCollector[i].title = this.vettoriDati.items[i].title;
      this.FilmCollector[i].image = this.vettoriDati.items[i].image;
      this.FilmCollector[i].id = this.vettoriDati.items[i].id;
      this.FilmCollector[i].year = this.vettoriDati.items[i].year;
      this.FilmCollector[i].genres = this.vettoriDati.items[i].genres;
      this.FilmCollector[i].directors = this.vettoriDati.items[i].directors;
      this.FilmCollector[i].runtime = this.vettoriDati.items[i].runtimeStr;
      this.FilmCollector[i].stars = this.vettoriDati.items[i].stars;
      this.FilmCollector[i].plot = this.vettoriDati.items[i].plot;
      this.FilmCollector[i].release = this.vettoriDati.items[i].releaseState;
    }
  }

  infoToggler(){
    this.infoFilm = !this.infoFilm;
    console.log(this.infoFilm);
    
  }

  attachId(id: String, position: number){
    this.FilmID = id;
    this.infoToggler();
  }


}
