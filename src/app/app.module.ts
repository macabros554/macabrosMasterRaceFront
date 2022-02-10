import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { DataTablesModule } from "angular-datatables";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
