import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { StatisticsComponent } from './components/views/statistics/statistics.component';
import { CardComponent } from './components/share/cards/card/card.component';
import { NormalSearchComponent } from './components/views/search/normal-search/normal-search.component';
import { CardViewComponent } from './components/views/card-view/card-view.component';
import { CommentsComponent } from './components/views/card-view/comments/comments.component';
import { AdminHomeComponent } from './components/views/admin/admin-home/admin-home.component';
import { DashboardComponent } from './components/views/admin/dashboard/dashboard.component';
import { CheckMessagesComponent } from './components/views/admin/check-messages/check-messages.component';
import { AdminConfigComponent } from './components/views/admin/admin-config/admin-config.component';
import { ModAdminInfoComponent } from './components/views/admin/mod-admin-info/mod-admin-info.component';
import { EditComponent } from './components/views/admin/check-messages/edit/edit.component';
import { ErrorModalComponent } from './components/share/modals/error-modal/error-modal.component';
import { CorrectModalComponent } from './components/share/modals/correct-modal/correct-modal.component';
import { InfoModalComponent } from './components/share/modals/info-modal/info-modal.component';
import { MymyvCardComponent } from './components/share/cards/mymyv-card/mymyv-card.component';
import { ChartsModule } from 'ng2-charts';
import { NoResultsComponent } from './components/views/search/no-results/no-results.component';
import { MymyvSearchComponent } from './components/views/search/mymyv-search/mymyv-search.component';
import { NoPostToCheckComponent } from './components/views/admin/check-messages/no-post-to-check/no-post-to-check.component';
import { ModifyCardComponent } from './components/share/modals/modify-card/modify-card.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { WarningModalComponent } from './components/share/modals/warning-modal/warning-modal.component';
import {NgxPaginationModule} from 'ngx-pagination';

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
    StatisticsComponent,
    CardComponent,
    NormalSearchComponent,
    CardViewComponent,
    CommentsComponent,
    DashboardComponent,
    AdminHomeComponent,
    CheckMessagesComponent,
    AdminConfigComponent,
    ModAdminInfoComponent,
    EditComponent,
    ErrorModalComponent,
    CorrectModalComponent,
    InfoModalComponent,
    MymyvCardComponent,
    NoResultsComponent,
    MymyvSearchComponent,
    NoPostToCheckComponent,
    ModifyCardComponent,
    WarningModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule,
    NgxPaginationModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
