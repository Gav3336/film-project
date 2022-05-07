import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Top250Component } from './top250/top250.component';
import { FilmComponent } from './film/film.component';
import { ComingsoonComponent } from './comingsoon/comingsoon.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { ReactiveFormsModule } from '@angular/forms';

const LISTA = [
  { path: 'login', component: LoginComponent },
  { path: '', component: FilmComponent },
  { path: 'top250', component: Top250Component },
  { path: 'coming', component: ComingsoonComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ComingsoonComponent,
    FilmComponent,
    LoginComponent,
    MenuComponent,
    Top250Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(LISTA),
    HttpClientModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
