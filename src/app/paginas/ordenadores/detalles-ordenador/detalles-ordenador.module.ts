import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetallesOrdenadorRoutingModule } from './detalles-ordenador-routing.module';
import { DetallesOrdenadorComponent } from './detalles-ordenador.component';


@NgModule({
  declarations: [
    DetallesOrdenadorComponent
  ],
  imports: [
    CommonModule,
    DetallesOrdenadorRoutingModule
  ],exports:[
    DetallesOrdenadorComponent
  ]
})
export class DetallesOrdenadorModule { }
