import { Injectable } from '@angular/core';
import { GLOBAL } from '../../shared/const';
import { Observable } from 'rxjs';

// Interfaces
import { Request } from 'src/app/models/request';

import { RequestService } from '../request/request.service';

import { io } from 'socket.io-client';
import { Chat } from 'src/app/models/chat';
import { Message } from 'src/app/models/message';

const apiEndPoint = GLOBAL.socketConfig.url;

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public socket: any;
  public chatObserver: any;
  public messageObserver: any;
  public requestObserver: any;
  public chatListObserver: any;
  public participantNotifier: any;
  public messageNotifierObserver: any;

  constructor(private _requestService: RequestService) {
    this.socket = io(apiEndPoint);
    this.updateRequest();
  }

  public loadActiveChat(options: any): void {
    this.socket.emit('load-chat', options);
  }

  public sendMessage(message: any): void {
    this.socket.emit('send-message', message);
  }

  public updateMessageNotification(message: any): void {
    this.socket.emit('update-message-notification', message);
  }

  public sendRequest(request: Request): void {
    this.socket.emit('send-request', request);
  }

  public cancelRequest(request: Request): void {
    this.socket.emit('update-request', request);
  }

  public acceptRequest(data: any): void {
    // this.socket.emit('update-request', data.request);
    this.socket.emit('reload-chat-list', data);
    // this.socket.emit('updated-chat-notifier', data)
  }

  private updateRequest(): void {
    this.socket.on('update-request', (request: Request) => {
      this._requestService.updateRequestStatus(request);
    });
  }

  public listenNotifier(): any {
    this.socket.on('chat-notifier', (data: any) => {
      this.participantNotifier.next(data);
    });

    return this.notifierListener();
  }

  private notifierListener(): any {
    return new Observable((data) => {
      this.participantNotifier = data;
    });
  }

  public reloadChatList(): any {
    this.socket.on('get-list', (data: any) => {
      this.chatListObserver.next(data);
    });

    return this.chatListListener();
  }

  private chatListListener(): any {
    return new Observable((data) => {
      this.chatListObserver = data;
    });
  }

  public listenRequest(): any {
    this.socket.on('listen-request', (request: Request) => {
      this.requestObserver.next(request);
    });

    return this.requestListener();
  }

  public listenMessageNotification(): any {
    this.socket.on('message-notifier', (message: any) => {
      this.messageNotifierObserver.next(message);
    });

    return this.messageNotificationListener();
  }

  private messageNotificationListener(): Observable<Message> {
    return new Observable((message) => {
      this.messageNotifierObserver = message;
    });
  }

  public listenMessages(): any {
    this.socket.on('listen-message', (message: any) => {
      this.messageObserver.next(message);
    });

    return this.messageListener();
  }

  public listenChat(): any {
    this.socket.on('listen-chat', (options: any) => {
      this.chatObserver.next(options);
    });

    return this.chatListener();
  }

  private chatListener(): Observable<any> {
    return new Observable((chat) => {
      this.chatObserver = chat;
    });
  }

  private messageListener(): Observable<any> {
    return new Observable((message) => {
      this.messageObserver = message;
    });
  }

  private requestListener(): Observable<any> {
    return new Observable((request) => {
      this.requestObserver = request;
    });
  }

  // public recieveMessages():Observable<any>{
  //   console.log('socket inside recieve:', this.socket.id);
  //   this.socket.on('recieve-message', (message) => {
  //     console.log('socket inside recieve 2:', this.socket.id);
  //     this.messageObserver.next(message);
  //   })

  //   return this.getMessageObs();
  // }

  // public sendMessage(message:any):void{
  //   this.socket.emit('sendMessage', message);
  // }
}
