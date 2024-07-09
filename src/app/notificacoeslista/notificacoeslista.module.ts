import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificacoeslistaPageRoutingModule } from './notificacoeslista-routing.module';

import { NotificacoeslistaPage } from './notificacoeslista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificacoeslistaPageRoutingModule
  ],
  declarations: [NotificacoeslistaPage]
})
export class NotificacoeslistaPageModule {}
