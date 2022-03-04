import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosUsuarioRoutingModule } from './datos-usuario-routing.module';
import { DatosUsuarioComponent } from './datos-usuario.component';
import { HijoComponent } from './hijo/hijo.component';
import { OrdenadoresModule } from '../../paginas/ordenadores/ordenadores.module';


@NgModule({
  declarations: [
    DatosUsuarioComponent,
    HijoComponent
  ],
  imports: [
    CommonModule,
    DatosUsuarioRoutingModule,
    OrdenadoresModule
  ],exports:[
    DatosUsuarioComponent
  ]
})
export class DatosUsuarioModule { }
