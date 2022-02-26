import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{ path: 'datosUsuario', loadChildren: () => import('./datos-usuario/datos-usuario.module').then(m => m.DatosUsuarioModule) },
{ path: 'datos-compra', loadChildren: () => import('./formulario-compra/formulario-compra.module').then(m => m.FormularioCompraModule) }

];


//formularioCompra
//datos-compra
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginasProtegidasRoutingModule { }
