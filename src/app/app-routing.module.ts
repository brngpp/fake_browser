import { NewDataComponent } from './new-data/new-data.component';
import { ResultComponent } from './search/result/result.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticazioneComponent } from './autenticazione/autenticazione.component';

const routes: Routes = [
  { path: '', component: ResultComponent },
  { path: 'result', component: ResultComponent },
  { path: 'autentication', component: AutenticazioneComponent },

  { path: 'newData', component: NewDataComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
