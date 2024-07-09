import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'menu-entrada',
    loadChildren: () => import('./menu-entrada/menu-entrada.module').then(m => m.MenuEntradaPageModule)
  },
  {
    path: '',
    redirectTo: 'menu-entrada',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'add-garantia',
    loadChildren: () => import('./add-garantia/add-garantia.module').then( m => m.AddGarantiaPageModule)
  },
  {
    path: 'ver-garantia/:garantiaNome',
    loadChildren: () => import('./ver-garantia/ver-garantia.module').then( m => m.VerGarantiaPageModule)
  },
  {
    path: 'menu-registo',
    loadChildren: () => import('./menu-registo/menu-registo.module').then( m => m.MenuRegistoPageModule)
  },
  {
    path: 'notificacoeslista',
    loadChildren: () => import('./notificacoeslista/notificacoeslista.module').then( m => m.NotificacoeslistaPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module').then( m => m.CategoriasPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
