import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ConfirmationService } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SharedModule } from '../shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';

import { UsuarioComponent } from './usuario.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioGridComponent } from './usuario-grid/usuario-grid.component';
import { UsuarioPerfilComponent } from './usuario-perfil/usuario-perfil.component';



@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioFormComponent,
    UsuarioGridComponent,
    UsuarioPerfilComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,

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

    MatTabsModule,

    SharedModule
  ],
  providers: [
    ConfirmationService
  ]
})
export class UsuarioModule { }
