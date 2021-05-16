import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from "./components/views/index/index.component";
import { InstructionsComponent } from './components/views/instructions/instructions.component';
import { MessagesComponent } from './components/views/messages/messages.component';
import { MymyvComponent } from './components/views/mymyv/mymyv.component';
import { SearchComponent } from './components/views/search/search.component';
import { StatisticsComponent } from './components/views/statistics/statistics.component';
import { CardViewComponent } from './components/views/card-view/card-view.component';
import { DashboardComponent } from './components/views/admin/dashboard/dashboard.component';
import { AdminHomeComponent } from './components/views/admin/admin-home/admin-home.component';
import { CheckMessagesComponent } from './components/views/admin/check-messages/check-messages.component';
import { AdminConfigComponent } from './components/views/admin/admin-config/admin-config.component';
import { ModAdminInfoComponent } from './components/views/admin/mod-admin-info/mod-admin-info.component';
import { EditComponent } from './components/views/admin/check-messages/edit/edit.component';
import { MymyvSearchComponent } from './components/views/search/mymyv-search/mymyv-search.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'instructions', component: InstructionsComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'mymyv', component: MymyvComponent },
  { path: 'search', component: SearchComponent },
  { path: 'mymyv-search', component: MymyvSearchComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'card_view', component: CardViewComponent },
  { path: 'admin_dashboard', component: DashboardComponent},
  { path: 'admin_dashboard/home', component: AdminHomeComponent, canActivate: [AuthGuard]  },
  { path: 'admin_dashboard/check_messages', component: CheckMessagesComponent, canActivate: [AuthGuard]  },
  { path: 'admin_dashboard/check_messages/edit', component: EditComponent, canActivate: [AuthGuard]  },
  { path: 'admin_dashboard/admin_config', component: AdminConfigComponent, canActivate: [AuthGuard]  },
  { path: 'admin_dashboard/mod_info', component: ModAdminInfoComponent, canActivate: [AuthGuard]  },
  { path: '**', component: IndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
