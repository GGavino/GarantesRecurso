import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerGarantiaPageRoutingModule } from './ver-garantia-routing.module';

import { VerGarantiaPage } from './ver-garantia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerGarantiaPageRoutingModule
  ],
  declarations: [VerGarantiaPage]
})
export class VerGarantiaPageModule {}
