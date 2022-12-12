import { Injectable } from '@angular/core';
import { map, tap, filter, Observable, Subject, takeUntil, first } from 'rxjs';
import { io } from 'socket.io-client';

import { Message } from 'src/app/shared/models/message.model';
import { global } from 'src/app/services/const';
import { Chat } from '../models/chat.model';
import { Request } from '../../shared/models/request.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private readonly SOCKET_URL = global.socketConfig.url;
  public socket = io(this.SOCKET_URL);

  public requestListener = new Observable((observer) => {
    this.socket.on('recieve-request', (request:Request) => {
      observer.next(request);
    })
  })

  public chatListener = new Observable((observer) => {
    this.socket.on('push-new-chat', (chat) => {
      observer.next(chat);
    })
  })

  public participantsListener = new Observable((observer) => {
    this.socket.on('listen-participant-updates', ({ user, action, chatId }) => {
      observer.next({user, action, chatId });
    })
  })

  public messageListener = new Observable<Message>((observer) => {
    this.socket.on('listen-messages', (message) => {
      observer.next(message);
    })
  })

  public typingUserListener = new Observable<any>((observer) => {
    this.socket.on('listen-typing', ({chatId, user, isTyping}) => {
      observer.next({chatId, user, isTyping});
    })
  })

  constructor(
  ) { }

  public sendRequest(request:any):void{
    this.socket.emit('send-request', request);
  }

  public sendNewChat(chat:Chat, request:Request):void{
    this.socket.emit('send-new-chat', { chat, request } );
  }

  public sendNewMessage(message:Message):void{
    this.socket.emit('send-new-message', message);
  }

  /**
   * Modify user list by an action
   * @param user
   * @param action Should be 'add' or 'remove'
   */
  public updateParticipantList(user:User, action:string, chatId:string):void{
    this.socket.emit('update-participants', {user, action, chatId});
  }

  public isTyping(chatId:string, isTyping:boolean, user?:User):void{
    this.socket.emit('listen-typing', {user, chatId, isTyping});
  }

}
