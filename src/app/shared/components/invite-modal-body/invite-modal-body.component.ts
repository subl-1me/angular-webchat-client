import { Component, OnInit, Input } from '@angular/core';

import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-invite-modal-body',
  templateUrl: './invite-modal-body.component.html',
  styleUrls: ['./invite-modal-body.component.css']
})
export class InviteModalBodyComponent implements OnInit{

  @Input() inviteType:string = '';
  @Input() chatId:string = '';

  public username:string = '';

  faInfoCircle = faInfoCircle;
  faMagnifyingGlass = faMagnifyingGlass;
  faUsers = faUsers;
  faGear = faGear;
  faEllipsis = faEllipsis;
  
  constructor() { }

  ngOnInit(): void {
  }
}
