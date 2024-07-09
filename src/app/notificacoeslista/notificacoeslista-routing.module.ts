import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificacoeslistaPage } from './notificacoeslista.page';

const routes: Routes = [
  {
    path: '',
    component: NotificacoeslistaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificacoeslistaPageRoutingModule {}
