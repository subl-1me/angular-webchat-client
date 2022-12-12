import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestListRoutingModule } from './request-list-routing.module';
import { RequestListComponent } from './request-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [RequestListComponent],
  imports: [
    CommonModule,
    RequestListRoutingModule,
    FontAwesomeModule
  ],
  exports: [ RequestListComponent ]
})
export class RequestListModule { }
