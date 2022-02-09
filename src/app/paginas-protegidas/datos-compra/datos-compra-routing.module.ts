import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatosCompraComponent } from './datos-compra.component';

const routes: Routes = [{ path: '', component: DatosCompraComponent },
{ path: 'resumen-compra', loadChildren: () => import('./resumen-compra/resumen-compra.module').then(m => m.ResumenCompraModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosCompraRoutingModule { }
