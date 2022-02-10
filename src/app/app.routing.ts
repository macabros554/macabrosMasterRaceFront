import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes =[
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'paginas', loadChildren: () => import('./paginas/paginas.module').then(m => m.PaginasModule) },
  { path: 'paginasProtegidas', canActivate:[ValidarTokenGuard], loadChildren: () => import('./paginas-protegidas/paginas-protegidas.module').then(m => m.PaginasProtegidasModule) },
  { path: '', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
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
