import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenadoresComponent } from './ordenadores.component';

const routes: Routes = [{ path: '', component: OrdenadoresComponent },
{
  path: 'detallesOrdenador/:id', loadChildren: () => import('./detalles-ordenador/detalles-ordenador.module').then(m => m.DetallesOrdenadorModule)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenadoresRoutingModule { }
