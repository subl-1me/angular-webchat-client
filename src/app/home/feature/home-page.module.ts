import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageComponent } from './home-page.component';

import { HomePageRoutingModule } from './home-page-routing.module';
import { NavbarModule } from 'src/app/shared/components/navbar/navbar.module';
import { ChatListModule } from 'src/app/chat-list/feature/chat-list.module';
import { RequestListModule } from 'src/app/request-list/feature/request-list.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InviteModalBodyModule } from 'src/app/shared/components/invite-modal-body/invite-modal-body.module';
import { ChatModule } from 'src/app/chat/feature/chat.module';
import { PresentationSideModule } from 'src/app/shared/components/presentation-side/presentation-side/presentation-side.module';

@NgModule({
  declarations:  [HomePageComponent ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    NavbarModule,
    ChatListModule,
    FontAwesomeModule,
    RequestListModule,
    InviteModalBodyModule,
    ChatModule,
    PresentationSideModule
  ]
})
export class HomePageModule { }
