import { Component, OnInit, DoCheck } from '@angular/core';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { Request } from 'src/app/shared/models/request.model';
import { RequestService } from 'src/app/shared/services/request.service';

import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/user/auth.service';
import { Chat } from 'src/app/shared/models/chat.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, DoCheck{

  public removedChatId:string = '';
  public selectedChat:Chat = { _id: '', participants: [], messages: [] };

  public userAuth:User = {
    username: '',
    email: ''
  }
  public requests:Request[];

  public inviteType:string = '';

  faPlus = faPlus;
  faList = faList;
  faMessage = faMessage;
  faUser = faUser;

  toggleRequest: boolean = false;

  constructor(
    private authService: AuthService,
    private requestService: RequestService
  ) {
    this.userAuth = this.authService.getUser();
    this.requests = this.requestService.requests;

    window.addEventListener('resize', this.reportWindowResize);
   }

  ngOnInit(): void {
  }

  public ngDoCheck(): void {
    this.requests = this.requestService.getRequests();
  }

  private reportWindowResize():void{
    if(window.innerWidth < 990){
      localStorage.setItem('isMobile', 'true');
      return;
    }

    localStorage.setItem('isMobile', 'false');
  }

  public toggleRequestsList():void{
    this.toggleRequest = !this.toggleRequest;
  }

  public refreshRequestList(event:any):void{
    this.requests = event;
  }

  public openChat(chat:Chat):void{
    this.selectedChat = chat;
  }

  public removedChatEvent(chatId:string):void{
    this.removedChatId = chatId;
    this.selectedChat = { _id: '', participants: [], messages: [] };
  }

  public setInviteType():void{
    this.inviteType = 'duo';
    localStorage.setItem('inviteType', 'duo');
  }

}
