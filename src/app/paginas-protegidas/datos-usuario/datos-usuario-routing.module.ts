import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatosUsuarioComponent } from './datos-usuario.component';

const routes: Routes = [{ path: '', component: DatosUsuarioComponent },
{ path: 'pedidos', loadChildren: () => import('./pedidos/pedidos.module').then(m => m.PedidosModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosUsuarioRoutingModule { }
