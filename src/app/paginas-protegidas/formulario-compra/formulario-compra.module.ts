import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularioCompraRoutingModule } from './formulario-compra-routing.module';
import { FormularioCompraComponent } from './formulario-compra.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormularioCompraComponent
  ],
  imports: [
    CommonModule,
    FormularioCompraRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],exports:[
    FormularioCompraComponent
  ]
})
export class FormularioCompraModule { }
