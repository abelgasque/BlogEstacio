import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from "@angular/flex-layout";

import { LoginComponent } from './login/login.component';
import { SegurancaPessoaComponent } from './seguranca-pessoa/seguranca-pessoa.component';
import { SegurancaComponent } from './seguranca.component';
import { SharedModule } from '../shared/shared.module';
import { PessoaModule } from '../pessoa/pessoa.module';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';

import { ApoioService } from './../util/apoio.service';

@NgModule({
  declarations: [
    LoginComponent,
    SegurancaPessoaComponent,
    SegurancaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    FlexLayoutModule,
    MatButtonModule,

    ButtonModule,
    InputTextModule,
    InputMaskModule,

    SharedModule,
    PessoaModule
  ],
  providers: [
    ApoioService
  ]
})
export class SegurancaModule { }
