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
import { SearchMymyvComponent } from './components/views/search/search-mymyv/search-mymyv.component';
import { CardComponent } from './components/views/index/card/card.component';
import { NormalSearchComponent } from './components/views/search/normal-search/normal-search.component';
import { CardViewComponent } from './components/views/card-view/card-view.component';
import { CommentsComponent } from './components/views/card-view/comments/comments.component';
import { AdminHomeComponent } from './components/views/admin/admin-home/admin-home.component';
import { DashboardComponent } from './components/views/admin/dashboard/dashboard.component';
import { CheckMessagesComponent } from './components/views/admin/check-messages/check-messages.component';
import { CreateAdminComponent } from './components/views/admin/create-admin/create-admin.component';
import { ModAdminInfoComponent } from './components/views/admin/mod-admin-info/mod-admin-info.component';

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
    SearchMymyvComponent,
    CardComponent,
    NormalSearchComponent,
    CardViewComponent,
    CommentsComponent,
    DashboardComponent,
    AdminHomeComponent,
    CheckMessagesComponent,
    CreateAdminComponent,
    ModAdminInfoComponent,
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
