import { Component, OnInit, Input } from '@angular/core';
import { FilmClass } from '../comune/film-class';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @Input() add1: FilmClass[] = [];

  constructor() { }

  ngOnInit(): void {
    this.stampaInfo();
  }


  stampaInfo(){

  }
}
