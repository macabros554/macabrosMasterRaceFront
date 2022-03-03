import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosUsuarioRoutingModule } from './datos-usuario-routing.module';
import { DatosUsuarioComponent } from './datos-usuario.component';
import { HijoComponent } from './hijo/hijo.component';


@NgModule({
  declarations: [
    DatosUsuarioComponent,
    HijoComponent
  ],
  imports: [
    CommonModule,
    DatosUsuarioRoutingModule
  ],exports:[
    DatosUsuarioComponent
  ]
})
export class DatosUsuarioModule { }
