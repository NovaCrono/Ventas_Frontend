import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CategoriaPageModule } from './categoria/categoria.module';
import { ProductoPageModule } from './producto/producto.module';
import { ItemPageModule } from './item/item.module';

import { RegistroPageRoutingModule } from './registro-routing.module';

import { RegistroPage } from './registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroPageRoutingModule,
    ReactiveFormsModule,
    CategoriaPageModule,
    ProductoPageModule,
    ItemPageModule
  ],
  declarations: [RegistroPage]
})
export class RegistroPageModule {}
