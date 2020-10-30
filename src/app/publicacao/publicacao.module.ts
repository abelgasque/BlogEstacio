import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicacaoComponent } from './publicacao.component';
import { PublicacaoFormComponent } from './publicacao-form/publicacao-form.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatTabsModule } from '@angular/material/tabs';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PanelModule } from 'primeng/panel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { SharedModule } from '../shared/shared.module';
import { PublicacaoService } from './publicacao.service'

@NgModule({
  declarations: [
    PublicacaoComponent,
    PublicacaoFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MatTabsModule,

    TableModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    DialogModule,
    ConfirmDialogModule,
    DropdownModule,
    PanelModule,
    SelectButtonModule,
    PasswordModule,
    InputTextareaModule,
    CalendarModule,

    SharedModule
  ],
  providers: [
    PublicacaoService
  ]
})
export class PublicacaoModule { }
