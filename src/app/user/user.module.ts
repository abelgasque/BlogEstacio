import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { SharedModule } from '../shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CalendarModule } from 'primeng/calendar';

import { UserComponent } from './user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserFormModelComponent } from './user-form-model/user-form-model.component';

@NgModule({
  declarations: [
    UserComponent,
    UserFormComponent,
    UserFormModelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,

    TableModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    DialogModule,
    DropdownModule,
    PanelModule,
    ToggleButtonModule,
    CalendarModule,

    SharedModule
  ],
  providers: [],
  exports:[
    UserFormComponent
  ]
})
export class UserModule { }
