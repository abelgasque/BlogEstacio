import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';

import { UserAccountComponent } from './user-account.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UserAccountPublicationsComponent } from './user-account-publications/user-account-publications.component';
import { UserAccountDefaultComponent } from './user-account-default/user-account-default.component';
import { UserModule } from '../user/user.module';
import { PublishModule } from '../publish/publish.module';

@NgModule({
  declarations: [
    UserAccountComponent, 
    UserAccountPublicationsComponent, 
    UserAccountDefaultComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    
    MatTabsModule,
    SharedModule,
    UserModule,
    PublishModule
  ]
})
export class UserAccountModule { }
