import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

import * as Moment from 'moment'
import * as Uniqid from 'uniqid'

import { Request } from '../models/request.model';
import { User } from '../models/user.model';
import { AuthService } from './user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  public request:Request;
  public requests:Request[] = [];
  public pendingRequests:Request[] = [];

  public userAuth:User = {
    email: '',
    username: '',
  }

  constructor(
    private socketService: SocketService,
    private authService: AuthService
  ) { 
    this.listenRequests();
    this.filterExpiredRequests();
    this.userAuth = this.authService.getUser();

    this.request = {
      _id: '',
      from: { 
        _id: this.userAuth._id || '',
        username: this.userAuth.username,
        avatar: this.userAuth.avatar
      },
      to:{
        _id: '',
        username: '',
      },
      type: 'duo',
      expiredAt: new Date()
    }

  }

  private listenRequests():void{
    this.socketService.requestListener.subscribe((request) => {
      let newRequest = <Request>request;
      if(newRequest.to._id !== this.userAuth._id) return;

      this.requests.push(newRequest);
      this.filterExpiredRequests();
    })
  }

  private filterExpiredRequests():void{

    const isValid = (request:Request) => {
      let now = Moment();
      let expiredAt = Moment(request.expiredAt);
      let diff = expiredAt.diff(now, 'seconds');
      if(diff > 0 ) { return true }

      return false;
    }

    this.requests = this.requests.filter(request => isValid(request));
    this.pendingRequests = this.pendingRequests.filter(request => isValid(request));
    this.saveOnLocal();
  }

  public getRequests():Request[]{
    this.filterExpiredRequests();
    return this.requests;
  }

  public getPendingRequest():Request[]{
    this.filterExpiredRequests();
    return this.pendingRequests;
  }

  /**
   * @param recipientUser 
   * @param chatId Only if the chat will be a group
   */
  public createRequest(recipientUser:User, chatId?:string):void{
    let inviteType = localStorage.getItem('inviteType') || 'duo';

    if(chatId && chatId !== '') { this.request.chatId = chatId }
    this.request.type = inviteType;
    this.request._id = Uniqid();
    this.request.to._id = recipientUser._id || '';
    this.request.to.username = recipientUser.username;
    this.request.createdAt = new Date();
    this.request.expiredAt = Moment().add('10', 'seconds').toDate();

    this.socketService.sendRequest(this.request);
    this.setPendingRequest();
    this.clearRequestFormat();
  }

  public removeRequestsById(requestId:string):void{
    this.requests = this.requests.filter(request => request._id !== requestId);
    this.saveOnLocal();
  }

  public removePendingRequest(requestId:string):void{
    this.pendingRequests = this.pendingRequests.filter(request => request._id !== requestId);
    this.saveOnLocal();
  }

  public setPendingRequest():void{
    this.pendingRequests.push(this.request);
    this.saveOnLocal();
  }

  private saveOnLocal():void{
    localStorage.setItem('requests', JSON.stringify(this.requests));
    localStorage.setItem('pendingRequests', JSON.stringify(this.pendingRequests));
  }

  private clearRequestFormat():void{
    this.request = {
      _id: '',
      from: { 
        _id: this.userAuth._id || '',
        username: this.userAuth.username,
        avatar: this.userAuth.avatar
      },
      to:{
        _id: '',
        username: '',
      },
      type: 'duo',
      expiredAt: new Date()
    }
  }

}
