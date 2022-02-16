import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdenadoresRoutingModule } from './ordenadores-routing.module';
import { OrdenadoresComponent } from './ordenadores.component';
import { HttpClientModule } from '@angular/common/http';
import { DetallesOrdenadorModule } from './detalles-ordenador/detalles-ordenador.module';


@NgModule({
  declarations: [
    OrdenadoresComponent
  ],
  imports: [
    CommonModule,
    OrdenadoresRoutingModule,
    HttpClientModule,
    DetallesOrdenadorModule

  ],exports:[
    OrdenadoresComponent
  ]
})
export class OrdenadoresModule { }
