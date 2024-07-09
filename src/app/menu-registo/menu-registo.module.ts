import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuRegistoPageRoutingModule } from './menu-registo-routing.module';

import { MenuRegistoPage } from './menu-registo.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuRegistoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MenuRegistoPage]
})
export class MenuRegistoPageModule {}
