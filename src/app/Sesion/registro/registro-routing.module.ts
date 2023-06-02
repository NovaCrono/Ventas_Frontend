import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroPage } from './registro.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroPage,
    children:[
      {
        path: 'categoria',
        loadChildren: () => import('../../Sesion/registro/categoria/categoria.module').then( m => m.CategoriaPageModule)
      },
      {
        path: 'producto',
        loadChildren: () => import('../../Sesion/registro/producto/producto.module').then( m => m.ProductoPageModule)
      },
      {
        path: 'item',
        loadChildren: () => import('../../Sesion/registro/item/item.module').then( m => m.ItemPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroPageRoutingModule {}
