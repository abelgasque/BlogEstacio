import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';

import { UserAccountComponent } from './user-account.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UserAccountComponent],
  imports: [
    CommonModule,
    RouterModule,
    
    MatTabsModule,
    SharedModule
  ]
})
export class UserAccountModule { }
