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
import { MymyvComponent } from './components/views/mymyv/mymyv.component';
import { FooterComponent } from './components/share/footer/footer.component';
import { NoPostsComponent } from './components/views/index/no-posts/no-posts.component';
import { StadisticsComponent } from './components/views/stadistics/stadistics.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    SearchComponent,
    MessagesComponent,
    InstructionsComponent,
    MymyvComponent,
    FooterComponent,
    NoPostsComponent,
    StadisticsComponent,
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
