import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenadoresComponent } from './ordenadores.component';

const routes: Routes = [{ path: '', component: OrdenadoresComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenadoresRoutingModule { }
