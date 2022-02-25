import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetallesOrdenadorRoutingModule } from './detalles-ordenador-routing.module';
import { DetallesOrdenadorComponent } from './detalles-ordenador.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DetallesOrdenadorComponent
  ],
  imports: [
    CommonModule,
    DetallesOrdenadorRoutingModule,
    FormsModule
  ],exports:[
    DetallesOrdenadorComponent
  ]
})
export class DetallesOrdenadorModule { }
