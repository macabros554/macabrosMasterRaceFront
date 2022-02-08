import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprarRoutingModule } from './comprar-routing.module';
import { ComprarComponent } from './comprar.component';


@NgModule({
  declarations: [
    ComprarComponent
  ],
  imports: [
    CommonModule,
    ComprarRoutingModule
  ]
})
export class ComprarModule { }
