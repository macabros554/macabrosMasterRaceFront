import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginasProtegidasRoutingModule } from './paginas-protegidas-routing.module';
import { DatosUsuarioModule } from './datos-usuario/datos-usuario.module';
import { ValidarTokenGuard } from '../guards/validar-token.guard';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    PaginasProtegidasRoutingModule,
    DatosUsuarioModule
  ],providers:[
    ValidarTokenGuard
  ]
})
export class PaginasProtegidasModule { }
