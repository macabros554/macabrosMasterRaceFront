import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularioCompraRoutingModule } from './formulario-compra-routing.module';
import { FormularioCompraComponent } from './formulario-compra.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormularioCompraComponent
  ],
  imports: [
    CommonModule,
    FormularioCompraRoutingModule,
    FormsModule
  ],exports:[
    FormularioCompraComponent
  ]
})
export class FormularioCompraModule { }
