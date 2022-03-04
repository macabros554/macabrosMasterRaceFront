import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdenadoresRoutingModule } from './ordenadores-routing.module';
import { OrdenadoresComponent } from './ordenadores.component';
import { HttpClientModule } from '@angular/common/http';
import { DetallesOrdenadorModule } from './detalles-ordenador/detalles-ordenador.module';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    OrdenadoresComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    OrdenadoresRoutingModule,
    HttpClientModule,
    DetallesOrdenadorModule

  ],exports:[
    OrdenadoresComponent,
    LoadingComponent
  ]
})
export class OrdenadoresModule { }
