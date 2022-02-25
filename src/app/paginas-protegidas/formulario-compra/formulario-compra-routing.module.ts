import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioCompraComponent } from './formulario-compra.component';

const routes: Routes = [{ path: '', component: FormularioCompraComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormularioCompraRoutingModule { }
