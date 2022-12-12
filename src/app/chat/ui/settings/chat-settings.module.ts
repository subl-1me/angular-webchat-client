import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatSettingsRoutingModule } from './chat-settings-routing.module';
import { ChatSettingsComponent } from './chat-settings.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ChatSettingsComponent],
  imports: [
    CommonModule,
    ChatSettingsRoutingModule,
    FormsModule
  ],
  exports: [ ChatSettingsComponent ]
})
export class ChatSettingsModule { }
