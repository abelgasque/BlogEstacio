import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { SegurancaComponent } from './seguranca/seguranca.component';
import { PublicacaoComponent } from './publicacao/publicacao.component';
import { LoginComponent } from './seguranca/login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioGridComponent } from './usuario/usuario-grid/usuario-grid.component';
import { UsuarioPerfilComponent } from './usuario/usuario-perfil/usuario-perfil.component';
import { LandpageComponent } from './default/landpage/landpage.component';
import { HomeComponent } from './default/home/home.component';

const routes: Routes = [
    {
        path: '', component: DefaultComponent,
        children: [
            { path: '', component: LandpageComponent },
            { path: 'home', component: HomeComponent }
        ]
    },
    {
        path: 'seguranca', component: SegurancaComponent,
        children: [
            { path: 'login', component: LoginComponent }
        ]
    },
    {
        path: 'usuario', component: UsuarioComponent,
        children: [
            { path: 'grid', component: UsuarioGridComponent },
            { path: 'perfil', component: UsuarioPerfilComponent }
        ]
    },
    { path: 'publicacao', component: PublicacaoComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }