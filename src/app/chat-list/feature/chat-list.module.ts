import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CdTimerModule } from 'angular-cd-timer';

import { ChatListRoutingModule } from './chat-list-routing.module';
import { ChatListComponent } from './chat-list.component';
import { LoaderSkeletonModule } from 'src/app/shared/components/loader-skeleton/loader-skeleton.module';


@NgModule({
  declarations: [ ChatListComponent ],
  imports: [
    CommonModule,
    ChatListRoutingModule,
    FontAwesomeModule,
    CdTimerModule,
    LoaderSkeletonModule
  ],
  exports: [ ChatListComponent ]
})
export class ChatListModule { }
