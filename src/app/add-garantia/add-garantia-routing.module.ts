import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGarantiaPage } from './add-garantia.page';

const routes: Routes = [
  {
    path: '',
    component: AddGarantiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddGarantiaPageRoutingModule {}
