import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InviteModalBodyRoutingModule } from './invite-modal-body-routing.module';
import { InviteModalBodyComponent } from './invite-modal-body.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserListModule } from '../user-list/user-list.module';


@NgModule({
  declarations: [ InviteModalBodyComponent ],
  imports: [
    CommonModule,
    InviteModalBodyRoutingModule,
    FontAwesomeModule,
    UserListModule,
    FormsModule
  ],
  exports: [ InviteModalBodyComponent ]
})
export class InviteModalBodyModule { }
