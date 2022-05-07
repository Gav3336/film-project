import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComingsoonComponent } from './comingsoon/comingsoon.component';
import { FilmComponent } from './film/film.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { Top250Component } from './top250/top250.component';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
