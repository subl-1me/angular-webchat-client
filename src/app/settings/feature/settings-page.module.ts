import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SettingsPageRoutingModule } from './settings-page-routing.module';
import { SettingsPageComponent } from './settings-page.component';
import { NavbarModule } from 'src/app/shared/components/navbar/navbar.module';


@NgModule({
  declarations: [SettingsPageComponent],
  imports: [
    CommonModule,
    SettingsPageRoutingModule,
    NavbarModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class SettingsPageModule { }
