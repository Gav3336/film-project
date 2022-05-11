import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilmTop } from '../comune/film-top';

@Component({
  selector: 'app-top250',
  templateUrl: './top250.component.html',
  styleUrls: ['./top250.component.css']
})
export class Top250Component implements OnInit {
  url;
  urlWiki;

  mostra: boolean;

  vettoriDati: any;
  vettoriWiki: any;

  FilmCollector: FilmTop[] = [];

  nomeFilm: String = "";

  infoFilm: boolean = false;
  FilmID: String = "";
  logged: boolean = true;

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
    this.url = 'https://imdb-api.com/it/API/Top250Movies/k_hp5e67w2/' + this.nomeFilm;
    this.mostra = false;
    this.miohttp.get(this.url).subscribe((dati) => {
      console.log(dati);
      this.vettoriDati = dati;
      this.mostra = true;

      this.fillCollector();
      console.log(this.FilmCollector)
      
    });
  }

  fillCollector() {
    for (let i = 0; i < this.vettoriDati.items.lenght; i++) {
      this.FilmCollector.push(new FilmTop());
      this.FilmCollector[i].title = this.vettoriDati.items[i].title;
      this.FilmCollector[i].image = this.vettoriDati.items[i].image;
      this.FilmCollector[i].id = this.vettoriDati.items[i].id;
      this.FilmCollector[i].year = this.vettoriDati.items[i].year;
      this.FilmCollector[i].rating = this.vettoriDati.items[i].imDbRating;
      this.FilmCollector[i].crew = this.vettoriDati.items[i].crew;
    }
  }

}
