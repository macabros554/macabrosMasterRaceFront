import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosCompraRoutingModule } from './datos-compra-routing.module';
import { DatosCompraComponent } from './datos-compra.component';
import { ResumenCompraModule } from './resumen-compra/resumen-compra.module';


@NgModule({
  declarations: [
    DatosCompraComponent
  ],
  imports: [
    CommonModule,
    DatosCompraRoutingModule,
    ResumenCompraModule
  ],exports:[
    DatosCompraComponent
  ]
})
export class DatosCompraModule { }
