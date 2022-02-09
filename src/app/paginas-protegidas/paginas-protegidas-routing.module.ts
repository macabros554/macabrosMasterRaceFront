import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{ path: 'datos-compra', loadChildren: () => import('./datos-compra/datos-compra.module').then(m => m.DatosCompraModule) },
{ path: 'datosUsuario', loadChildren: () => import('./datos-usuario/datos-usuario.module').then(m => m.DatosUsuarioModule) }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginasProtegidasRoutingModule { }
