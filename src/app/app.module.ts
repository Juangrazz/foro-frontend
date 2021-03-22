import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/share/navbar/navbar.component';
import { IndexComponent } from './components/views/index/index.component';
import { SearchComponent } from './components/views/search/search.component';
import { MessagesComponent } from './components/views/messages/messages.component';
import { InstructionsComponent } from './components/views/instructions/instructions.component';
import { MyhyvComponent } from './components/views/myhyv/myhyv.component';
import { FooterComponent } from './components/share/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    SearchComponent,
    MessagesComponent,
    InstructionsComponent,
    MyhyvComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
