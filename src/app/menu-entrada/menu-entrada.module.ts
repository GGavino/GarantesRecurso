import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuEntradaPageRoutingModule } from './menu-entrada-routing.module';

import { MenuEntradaPage } from './menu-entrada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuEntradaPageRoutingModule
  ],
  declarations: [MenuEntradaPage]
})
export class MenuEntradaPageModule {}
