import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';

import { AuthService } from '../../services/user/auth.service';
import { ChatListService } from 'src/app/chat-list/access-data/chat-list.service';

import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [
    ChatListService,
    RequestService,
    UserService
  ]
})
export class UserListComponent implements OnInit, OnChanges{

  public users:User[] = [];
  public userAuth:User = {
    email: '',
    username: ''
  }

  @Input() username:string = '';
  @Input() chatId:string = '';
  public inviteType:string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private requestService: RequestService,
    private ChatListService: ChatListService
  ) {
    this.userAuth = this.authService.getUser();

  }

  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['username']) this.getUser();
  }

  public getUser():void{
    if(this.username === ''){
      this.users = [];
      return;
    }

    this.userService.searchUser(this.username).subscribe((response) => {
      if(response.error || response.status === 'error') return;

      this.username = '';
      response.users = response.users.filter((user:User) => user._id !== this.userAuth._id);
      this.users = response.users;

      this.filterUserByActiveRequest();
      this.filterUsersInsideChat();
    })
  }

  private filterUsersInsideChat():void{
    const chat = this.ChatListService.getChatById(this.chatId);
    if(!chat) { return }

    chat.participants.map(user => {
      this.users = this.users.filter(_user => _user._id !== user._id);
    })
  }

  private filterUserByActiveRequest():void{
    const pendingRequests = this.requestService.getPendingRequest();
    const hasPendingRequest = (user:User) => {
      for(const request of pendingRequests){
        if(request.to._id === user._id) { return true }
      }

      return false;
    }

    this.users = this.users.filter(user => !hasPendingRequest(user));
  }


  public sendRequest(recipientUser:User):void{
    let activeChatId = localStorage.getItem('activedChatId') || '';
    this.requestService.createRequest(recipientUser, activeChatId);
    this.chatId = '';
    this.users = this.users.filter(user => user._id !== recipientUser._id);
  }
  
  public stringAsDate(date:any){
    return new Date(date);
  }
}
