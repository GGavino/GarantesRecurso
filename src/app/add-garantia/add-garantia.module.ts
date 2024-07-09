import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddGarantiaPageRoutingModule } from './add-garantia-routing.module';

import { AddGarantiaPage } from './add-garantia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddGarantiaPageRoutingModule
  ],
  declarations: [AddGarantiaPage]
})
export class AddGarantiaPageModule {}
