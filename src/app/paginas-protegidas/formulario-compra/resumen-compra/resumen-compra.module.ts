import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumenCompraRoutingModule } from './resumen-compra-routing.module';
import { ResumenCompraComponent } from './resumen-compra.component';


@NgModule({
  declarations: [
    ResumenCompraComponent
  ],
  imports: [
    CommonModule,
    ResumenCompraRoutingModule
  ],exports:[
    ResumenCompraComponent
  ]
})
export class ResumenCompraModule { }
