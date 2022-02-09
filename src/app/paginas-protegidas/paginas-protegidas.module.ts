import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginasProtegidasRoutingModule } from './paginas-protegidas-routing.module';
import { DatosCompraModule } from './datos-compra/datos-compra.module';
import { DatosUsuarioModule } from './datos-usuario/datos-usuario.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    PaginasProtegidasRoutingModule,
    DatosCompraModule,
    DatosUsuarioModule
  ]
})
export class PaginasProtegidasModule { }
