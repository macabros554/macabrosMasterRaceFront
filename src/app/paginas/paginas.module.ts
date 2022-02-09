import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginasRoutingModule } from './paginas-routing.module';
import { OrdenadoresModule } from './ordenadores/ordenadores.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    PaginasRoutingModule,
    OrdenadoresModule
  ]
})
export class PaginasModule { }
