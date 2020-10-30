import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastyComponent } from './components/toasty/toasty.component';
import { ToastyService } from './components/toasty/toasty.service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FooterComponent } from './components/footer/footer.component';
import { TabelaPublicacoesDefaultComponent } from './components/tabela-publicacoes-default/tabela-publicacoes-default.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ToastyComponent,
    SpinnerComponent,
    FooterComponent,
    TabelaPublicacoesDefaultComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    MatCardModule,
    MatDividerModule,
    
    SidebarModule,
    AccordionModule,
    ScrollPanelModule,
    TableModule,
    TreeTableModule,
    ToastModule,
    ProgressSpinnerModule,
    InputTextModule,
    InputTextareaModule

  ],
  exports: [
    NavbarComponent,
    ToastyComponent,
    SpinnerComponent,
    FooterComponent,
    TabelaPublicacoesDefaultComponent
  ],
  providers: [
    ToastyService,
    MessageService
  ]
})
export class SharedModule { }
