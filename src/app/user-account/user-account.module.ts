import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';

import { UserAccountComponent } from './user-account.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserAccountComponent],
  imports: [
    CommonModule,
    RouterModule,
    
    MatTabsModule
  ]
})
export class UserAccountModule { }
