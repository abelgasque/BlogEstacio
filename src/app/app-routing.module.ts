import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { LandpageComponent } from './default/landpage/landpage.component';
import { HomeComponent } from './default/home/home.component';
import { UserComponent } from './user/user.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { PublishComponent } from './publish/publish.component';
import { SecurityComponent } from './security/security.component';
import { LoginComponent } from './security/login/login.component';
import { UserAccountDefaultComponent } from './user-account/user-account-default/user-account-default.component';
import { UserAccountPublicationsComponent } from './user-account/user-account-publications/user-account-publications.component';
import { AboutComponent } from './default/about/about.component';

const routes: Routes = [
    {
        path: '', component: DefaultComponent,
        children: [
            { path: '', component: LandpageComponent },
            { path: 'about', component: AboutComponent },
            { path: 'home', component: HomeComponent }
        ]
    },
    {
        path: 'security', component: SecurityComponent,
        children: [
            { path: 'login', component: LoginComponent }
        ]
    },
    {
        path: 'user-account', component: UserAccountComponent,
        children: [
            { path: 'default', component: UserAccountDefaultComponent },
            { path: 'publications', component: UserAccountPublicationsComponent },
        ]
    },
    { path: 'user', component: UserComponent },
    { path: 'publish', component: PublishComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }