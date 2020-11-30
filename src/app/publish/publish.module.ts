import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { TooltipModule } from 'primeng/tooltip';
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
import {FileUploadModule} from 'primeng/fileupload';
import {MenuModule} from 'primeng/menu';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {SplitButtonModule} from 'primeng/splitbutton';

import { SharedModule } from '../shared/shared.module';
import { PublishComponent } from './publish.component';
import { PublishModelFormComponent } from './publish-model-form/publish-model-form.component';
import { PublishFeedComponent } from './publish-feed/publish-feed.component';

@NgModule({
  declarations: [
    PublishComponent, 
    PublishModelFormComponent, 
    PublishFeedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MatCardModule,
    MatDividerModule,

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
    FileUploadModule,
    TooltipModule,
    MenuModule,
    ToggleButtonModule,
    SplitButtonModule,
    
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    
    SharedModule
  ],
  exports:[
    PublishFeedComponent
  ]
})
export class PublishModule { }
