import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from "./components/views/index/index.component";
import { InstructionsComponent } from './components/views/instructions/instructions.component';
import { MessagesComponent } from './components/views/messages/messages.component';
import { MymyvComponent } from './components/views/mymyv/mymyv.component';
import { SearchComponent } from './components/views/search/search.component';
import { StadisticsComponent } from './components/views/stadistics/stadistics.component';
import { SearchMymyvComponent } from './components/views/search/search-mymyv/search-mymyv.component';
import { CardViewComponent } from './components/views/card-view/card-view.component';
import { DashboardComponent } from './components/views/admin/dashboard/dashboard.component';
import { AdminHomeComponent } from './components/views/admin/admin-home/admin-home.component';
import { CheckMessagesComponent } from './components/views/admin/check-messages/check-messages.component';
import { CreateAdminComponent } from './components/views/admin/create-admin/create-admin.component';
import { ModAdminInfoComponent } from './components/views/admin/mod-admin-info/mod-admin-info.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'instructions', component: InstructionsComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'mymyv', component: MymyvComponent },
  { path: 'search', component: SearchComponent },
  { path: 'search_mymyv', component: SearchMymyvComponent },
  { path: 'stadistics', component: StadisticsComponent },
  { path: 'card_view', component: CardViewComponent },
  { path: 'admin_dashboard', component: DashboardComponent },
  { path: 'home', component: AdminHomeComponent },
  { path: 'check_messages', component: CheckMessagesComponent },
  { path: 'create_admin', component: CreateAdminComponent },
  { path: 'mod_info', component: ModAdminInfoComponent },
  { path: '**', component: IndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
