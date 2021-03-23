import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from "./components/views/index/index.component";
import { InstructionsComponent } from './components/views/instructions/instructions.component';
import { MessagesComponent } from './components/views/messages/messages.component';
import { MymyvComponent } from './components/views/mymyv/mymyv.component';
import { SearchComponent } from './components/views/search/search.component';
import { StadisticsComponent } from './components/views/stadistics/stadistics.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'instructions', component: InstructionsComponent},
  { path: 'messages', component: MessagesComponent },
  { path: 'mymyv', component: MymyvComponent },
  { path: 'search', component: SearchComponent },
  { path: 'stadistics', component: StadisticsComponent },
  { path: '**', component: IndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
