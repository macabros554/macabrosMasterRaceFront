import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdenadoresRoutingModule } from './ordenadores-routing.module';
import { OrdenadoresComponent } from './ordenadores.component';


@NgModule({
  declarations: [
    OrdenadoresComponent
  ],
  imports: [
    CommonModule,
    OrdenadoresRoutingModule
  ],exports:[
    OrdenadoresComponent
  ]
})
export class OrdenadoresModule { }
