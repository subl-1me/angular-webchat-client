import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InviteModalBodyModule } from 'src/app/shared/components/invite-modal-body/invite-modal-body.module';
import { ChatSettingsModule } from '../ui/settings/chat-settings.module';

@NgModule({
  declarations: [ ChatComponent ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FontAwesomeModule,
    FormsModule,
    InviteModalBodyModule,
    ChatSettingsModule
  ],
  exports: [ ChatComponent ]
})
export class ChatModule { }
