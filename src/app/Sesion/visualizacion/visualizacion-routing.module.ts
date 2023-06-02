import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizacionPage } from './visualizacion.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizacionPage,
    children:[
      {
        path: 'producto',
        loadChildren: () => import('../../Sesion/visualizacion/producto/producto.module').then( m => m.ProductoPageModule)
      },
      {
        path: 'factura',
        loadChildren: () => import('../../Sesion/visualizacion/factura/factura.module').then( m => m.FacturaPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizacionPageRoutingModule {}
