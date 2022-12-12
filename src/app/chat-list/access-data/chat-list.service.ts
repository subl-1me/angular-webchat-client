import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { GLOBAL } from 'src/app/shared/const';
import { catchError, Observable, of, Subscription, tap } from 'rxjs';

import { SocketService } from 'src/app/shared/services/socket.service';

import { AuthService } from 'src/app/shared/services/user/auth.service';
import { Chat } from '../models/chat.model';

import { User } from 'src/app/shared/models/user.model';
import { RequestService } from 'src/app/shared/services/request.service';
import { Message } from 'src/app/shared/models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatListService {

  public chats:Chat[] = [];
  public loading:boolean = false;

  private headers:HttpHeaders;
  private readonly API_URL:string = GLOBAL.API_URL;
  private readonly userId:string;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private socketService: SocketService,
    private requestService: RequestService
  ) { 
    this.userId = this.authService.getUser()._id || '';
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    })

    this.loadItems();
    this.chatListener();
    this.participantListListener();
  }

  public filterChatById(chatId:string):void{
    this.chats = this.chats.filter(chat => chat._id !== chatId);
  }

  public getChatById(chatId:string):Chat|null{
    const chat = this.chats.find(chat => chat._id === chatId);
    return chat || null;
  }

  public addMessageToChat(chatId:string, message:Message):void{
    const chat = this.chats.find(chat => chat._id === chatId);
    if(!chat) return;


    chat.messages.push(message);
  }

  public loadItems():void{
    this.loading = true;
    this.getRequest().subscribe((response) => {
      //TODO: Pending add feedback
      if(response.error || response.status === 'error') { return }

      this.chats = response.chats;
      this.filterUser(this.userId); // filter myself for better handling
      this.loading = false;
    })
  }

  private chatListener():void{
    this.socketService.chatListener.subscribe((response:any) => { 
      let chatParticipants = response.chat.participants;
      let isUserParticipant = chatParticipants.find((user:User) => user._id === this.userId);
      if(!isUserParticipant) { return }

      let chatInList = this.chats.find(_chat => _chat._id === response.chat._id);
      if(!chatInList){
        response.chat.participants = response.chat.participants
          .filter((_user:User) => _user._id !== this.userId);
        this.chats.push(response.chat);
      }

      this.requestService.removePendingRequest(response.request._id);

    })
  }

  private participantListListener():void{
    this.socketService.participantsListener.subscribe((response:any) => {
      const { user, chatId, action } = response; // User should be user object or ID
      this.chats.map(chat => {
        if(chat._id === chatId){ 
          if(action === 'add') { 
            // const isUserInList = chat.participants.find(_user => _user._id === user._id);
            // console.log(isUserInList);
            // if(isUserInList) { return; }
            chat.participants.push(user) 
            if(chat.participants.length > 1 ) { chat.isGroup = true }
            console.log(chat);

            // Send 'user has joined' notification
            let userJoinedMessage:Message = {
              user: user,
              content: '',
              chat: chatId,
              isNotification: true,
              notificationType: 'user-joined',
              createdAt: new Date(),
            }
            chat.messages.push(userJoinedMessage); // just temporal message
          }
          if(action === 'remove'){
            chat.participants = chat.participants.filter(_user => _user._id !== user._id);
            if(chat.participants.length <= 1) { chat.isGroup = false }
            console.log(chat);


            // send 'user has left' notification
            let userLeftMessage:Message = {
              user: user,
              content: '',
              chat: chatId,
              isNotification: true,
              notificationType: 'user-left',
              createdAt: new Date(),
            }
            chat.messages.push(userLeftMessage); // just temporal message
          }
        } 
        return chat;
      })
    })
  }

  private filterUser(userId:string):void{
    this.chats.forEach(chat => {
      chat.participants = chat.participants.filter(user => user._id !== userId);
    })
  }

  private getRequest():Observable<any>{
    return this.http.get(this.API_URL+'chat', { headers: this.headers, params: { userId: this.userId }}).pipe(
      tap(),
      catchError(this.handleError<Chat[]>('getChats'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any):Observable<T> => {

      // Logout user if token is invalid
      if(error.error === 'Invalid token.'){
        alert('Authentication error. Please log in again')
        this.authService.logOut();
      }

      // Logout if token has expired
      if(error.error === 'Expired token'){
        alert('Token expired. Please log in again.')
        this.authService.logOut();
      }

      return of(result as T);
    }
  }
}
