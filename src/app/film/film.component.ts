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
    this.url = 'https://imdb-api.com/it/API/Search/k_hp5e67w2/' + this.nomeFilm;
    this.mostra = false;
    this.miohttp.get(this.url).subscribe((dati) => {
      console.log(dati);
      this.vettoriDati = dati;
      this.mostra = true;

      this.fillCollector();
      this.chiamaWikiFilm();
      
    });
  }

  fillCollector() {
    for (let i = 0; i < this.vettoriDati.results.length; i++) {
      this.FilmCollector.push(new FilmClass());
      this.FilmCollector[i].title = this.vettoriDati.results[i].title;
      this.FilmCollector[i].image = this.vettoriDati.results[i].image;
      this.FilmCollector[i].id = this.vettoriDati.results[i].id;
      this.FilmCollector[i].year = '22222';
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

  chiamaWikiFilm() {
    for(let i = 0; i < this.vettoriDati.results.length; i++){
    this.url = 'https://imdb-api.com/en/API/Wikipedia/k_hp5e67w2/' + this.FilmCollector[i].id;
    this.mostra = false;
    this.miohttp.get(this.url).subscribe((dati) => {
      
      this.vettoriDati = dati;
      this.mostra = true;

      this.FilmCollector[i].plotShort = this.vettoriDati.plotShort.plainText;
      this.FilmCollector[i].plotfull = this.vettoriDati.plotfull.plainText;
      console.log(this.FilmCollector[i].plotfull);
    });
  }
  }

  chiamaTrailer(id:String, position: number) {
    this.url = 'https://imdb-api.com/en/API/Wikipedia/k_hp5e67w2/' + id;
    this.mostra = false;
    this.miohttp.get(this.url).subscribe((dati) => {
      
      this.vettoriDati = dati;
      this.mostra = true;

      this.FilmCollector[position].plotShort = this.vettoriDati.plotShort.plainText;
      console.log(this.FilmCollector[position].plotShort);
    });
  }

  controlloLogin(){
    if(this.logged == true){
      this.infoFilm = true;
    }else{
      this.infoFilm = false;
    }
  }

}
