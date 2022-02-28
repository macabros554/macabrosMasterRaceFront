import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioCompraComponent } from './formulario-compra.component';

const routes: Routes = [{ path: '', component: FormularioCompraComponent },
 { path: 'resumenCompra/:id', loadChildren: () => import('./resumen-compra/resumen-compra.module').then(m => m.ResumenCompraModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormularioCompraRoutingModule { }
