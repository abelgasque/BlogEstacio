import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from '@angular/material/button';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';

import { SharedModule } from '../shared/shared.module';
import { ApoioService } from './../util/apoio.service';
import { AuthService } from './auth.service';
import { SecurityComponent } from './security.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    SecurityComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    MatButtonModule,

    ButtonModule,
    InputTextModule,
    InputMaskModule,

    SharedModule
  ],
  providers: [
    ApoioService,
    AuthService
  ]
})
export class SecurityModule { }
