import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuRegistoPage } from './menu-registo.page';

const routes: Routes = [
  {
    path: '',
    component: MenuRegistoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRegistoPageRoutingModule {}
