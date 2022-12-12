import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresentationSideRoutingModule } from './presentation-side-routing.module';
import { PresentationSideComponent } from './presentation-side.component';
import { InviteModalBodyModule } from '../../invite-modal-body/invite-modal-body.module';


@NgModule({
  declarations: [PresentationSideComponent],
  imports: [
    CommonModule,
    PresentationSideRoutingModule,
    InviteModalBodyModule

  ],
  exports: [
    PresentationSideComponent,
  ]
})
export class PresentationSideModule { }
