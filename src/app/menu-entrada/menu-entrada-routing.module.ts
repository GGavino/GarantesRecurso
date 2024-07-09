import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuEntradaPage } from './menu-entrada.page';

const routes: Routes = [
  {
    path: '',
    component: MenuEntradaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuEntradaPageRoutingModule {}
