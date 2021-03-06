import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MapBaseComponent } from './map-base/map-base.component';
import { GameOverPanelComponent } from './game-over-panel/game-over-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapBaseComponent,
    GameOverPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
