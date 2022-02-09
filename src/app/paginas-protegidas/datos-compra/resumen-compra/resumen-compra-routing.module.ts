import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumenCompraComponent } from './resumen-compra.component';

const routes: Routes = [{ path: '', component: ResumenCompraComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResumenCompraRoutingModule { }
