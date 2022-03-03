import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdenadoresRoutingModule } from './ordenadores-routing.module';
import { OrdenadoresComponent } from './ordenadores.component';
import { HttpClientModule } from '@angular/common/http';
import { DetallesOrdenadorModule } from './detalles-ordenador/detalles-ordenador.module';
import { DesplazarArribaComponent } from './desplazar-arriba/desplazar-arriba.component';

@NgModule({
  declarations: [
    OrdenadoresComponent,
    DesplazarArribaComponent
  ],
  imports: [
    CommonModule,
    OrdenadoresRoutingModule,
    HttpClientModule,
    DetallesOrdenadorModule

  ],exports:[
    OrdenadoresComponent,
    DesplazarArribaComponent
  ]
})
export class OrdenadoresModule { }
