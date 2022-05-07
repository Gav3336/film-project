import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FilmClass } from '../comune/film-class';

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

  nomeFilm: String;

  constructor(private miohttp: HttpClient) {
    this.url = "";
    this.urlWiki = "";
    this.mostra = false;
    this.nomeFilm = "undefined";
   }

  ngOnInit(): void {
    this.mostra = false;
    this.chiamaDatiFilm();
  }

  chiamaDatiFilm() {
    this.url = 'https://imdb-api.com/it/API/Search/k_nrhizwhl/' + this.nomeFilm;
    this.mostra = false;
    this.miohttp.get(this.url).subscribe((dati) => {
      console.log(dati);
      this.vettoriDati = dati;
      this.mostra = true;
      console.log(this.FilmCollector);
      this.fillCollector();
      
    });
  }

  chiamaWikiFilm() {
    for (let i = 0; i < this.vettoriDati.results.length; i++) {
      this.url =
        'https://imdb-api.com/en/API/Wikipedia//' +
        this.vettoriDati.results[i].id;
      this.miohttp.get(this.url).subscribe((dati) => {
        console.log(dati);
        this.vettoriWiki = dati;
        this.mostra = true;

        this.fillCollector();
      });
    }
  }

  fillCollector() {
    for (let i = 0; i < this.vettoriDati.results.length; i++) {
      this.FilmCollector.push(new FilmClass());
      this.FilmCollector[i].title = this.vettoriDati.results[i].title;
      this.FilmCollector[i].image = this.vettoriDati.results[i].image;
      this.FilmCollector[i].id = this.vettoriDati.results[i].id;
      this.FilmCollector[i].year = '22222';
    }
    console.log(this.FilmCollector[0].image);
  }

}
