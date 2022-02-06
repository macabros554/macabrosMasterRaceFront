import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComprarComponent } from './auth/pages/comprar/comprar.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegistrarComponent } from './auth/pages/registrar/registrar.component';


const routes: Routes =[
  { path: '', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'comprar', component: ComprarComponent }
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
