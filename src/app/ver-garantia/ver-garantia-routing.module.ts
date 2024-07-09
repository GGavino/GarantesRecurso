import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerGarantiaPage } from './ver-garantia.page';

const routes: Routes = [
  {
    path: '',
    component: VerGarantiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerGarantiaPageRoutingModule {}
