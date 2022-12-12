import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegisterPageRoutingModule } from './register-page-routing.module';
import { RegisterPageComponent } from './register-page.component';


@NgModule({
  declarations: [RegisterPageComponent],
  imports: [
    CommonModule,
    RegisterPageRoutingModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class RegisterPageModule { }
