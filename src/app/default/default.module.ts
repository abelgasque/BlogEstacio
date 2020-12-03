import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { HomeComponent } from './home/home.component';
import { DefaultComponent } from './default.component';
import { SharedModule } from './../shared/shared.module';
import { LandpageComponent } from './landpage/landpage.component';
import { PublishModule } from '../publish/publish.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    HomeComponent,
    DefaultComponent, 
    LandpageComponent, 
    AboutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    MatTabsModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,

    SharedModule,
    PublishModule

  ]
})
export class DefaultModule { }
