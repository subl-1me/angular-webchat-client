import { Injectable } from '@angular/core';

import { SocketService } from './socket.service';
import { AuthService } from './user/auth.service';
import { User } from '../models/user.model';

import * as Moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UsersTypingService {

  public users:User[] = [];
  public myUser:User;
  public userId:string;
  private activeChatId:string = localStorage.getItem('activedChatId') || '';

  private typingCooldown:any = null;
  private cooldownInterval:any;

  constructor(
    private socketService: SocketService,
    private authService: AuthService
  ) {
    this.myUser = { username: '', email: '' };
    this.userId = this.authService.getUser()._id || '';

    this.userTypingListener();
    this.cooldownInterval = setInterval(() => {
      this.userNotTypingChecker();
    }, 1000)
   }

     /**
   * After 6 seconds of not typing, filter this user from usersTyping object to remove 'typing...' message
   */
  public userNotTypingChecker():void{
    if(this.typingCooldown === null) { return };
    let now = Moment();

    let diff = this.typingCooldown.diff(now, 'seconds');
    if(diff <= 0){
      this.isNotTyping();
      this.typingCooldown = null;
    }
  }

  public resetTyping():void{
    this.typingCooldown = null;
    this.isNotTyping();
  }

  public userTypingEvent(user:User):void{
    this.myUser = user;
    this.typingCooldown = Moment().add('2', 'seconds');
    const isUserTyping = this.users.find(user => user._id === this.myUser._id);
    if(isUserTyping) { return } 
    this.activeChatId = localStorage.getItem('activedChatId') || '';
    this.socketService.isTyping(this.activeChatId, true, this.myUser);
  }

  public refreshActiveChatId():void{
    this.activeChatId = localStorage.getItem('activedChatId') || '';
  }


  public userTypingListener():void{
    this.socketService.typingUserListener.subscribe((response) => {
      const { user, chatId, isTyping } = response;

      this.activeChatId = localStorage.getItem('activedChatId') || '';
      if(this.activeChatId !== chatId) { return; } // return if chat is not active
      if(user._id === this.myUser._id) { return; } // return if i am typing

      const isUserInList = this.users.find(_user => _user._id === user._id);
      if(isUserInList && isTyping) { return }

      if(isTyping){
        this.users.push(user);
        return;
      }

      this.users = this.users.filter(_user => _user._id !== user._id);

    })
  }

  private isNotTyping():void{
    this.socketService.isTyping(this.activeChatId, false, this.myUser);
  }
}
