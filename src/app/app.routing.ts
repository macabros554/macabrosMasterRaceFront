import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =[
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'paginas', loadChildren: () => import('./paginas/paginas.module').then(m => m.PaginasModule) },
  { path: 'paginasProtegidas', loadChildren: () => import('./paginas-protegidas/paginas-protegidas.module').then(m => m.PaginasProtegidasModule) }
];

@NgModule({
    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}
