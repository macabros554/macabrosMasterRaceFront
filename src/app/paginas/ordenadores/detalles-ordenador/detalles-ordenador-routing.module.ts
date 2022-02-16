import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallesOrdenadorComponent } from './detalles-ordenador.component';

const routes: Routes = [{ path: '', component: DetallesOrdenadorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetallesOrdenadorRoutingModule { }
