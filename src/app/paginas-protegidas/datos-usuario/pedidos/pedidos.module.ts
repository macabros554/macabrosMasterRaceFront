import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosComponent } from './pedidos.component';
import { DataTablesModule } from 'angular-datatables';
import { OrdenadoresModule } from '../../../paginas/ordenadores/ordenadores.module';


@NgModule({
  declarations: [
    PedidosComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    DataTablesModule,
    OrdenadoresModule
  ],exports:[
    PedidosComponent
  ]
})
export class PedidosModule { }
