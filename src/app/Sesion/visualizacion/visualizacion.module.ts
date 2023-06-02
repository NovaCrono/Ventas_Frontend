import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizacionPageRoutingModule } from './visualizacion-routing.module';

import { VisualizacionPage } from './visualizacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizacionPageRoutingModule
  ],
  declarations: [VisualizacionPage]
})
export class VisualizacionPageModule {}
