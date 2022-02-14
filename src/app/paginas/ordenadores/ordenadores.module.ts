import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdenadoresRoutingModule } from './ordenadores-routing.module';
import { OrdenadoresComponent } from './ordenadores.component';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from "angular-datatables";






@NgModule({
  declarations: [
    OrdenadoresComponent
  ],
  imports: [
    CommonModule,
    OrdenadoresRoutingModule,
    HttpClientModule,
    DataTablesModule

  ],exports:[
    OrdenadoresComponent
  ]
})
export class OrdenadoresModule { }
