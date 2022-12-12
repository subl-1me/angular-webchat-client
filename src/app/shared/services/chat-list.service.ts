import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './user/auth.service';

import { Chat } from '../models/chat.model';
import { GLOBAL } from '../const';

@Injectable({
  providedIn: 'root'
})
export class ChatListService {
  
  public chats:Chat[] = [];
  public readonly userId:string;
  private readonly API_URL:string = GLOBAL.API_URL;
  private headers: HttpHeaders;

  constructor(
    private http:HttpClient,
    private AuthService:AuthService
  ) {
    this.userId = this.AuthService.getUser()._id || '';
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.AuthService.getToken()
    })

    this.loadItems();
   }
  
  public loadItems():void{  
    this.getChatList().subscribe((response) => {
      // TODO: Add feedback when trying to load items error
      if(response.error || response.status === 'error'){ return } 

      this.chats = response.chats;
    })
  }

  private getChatList():Observable<any>{
    return this.http.get(this.API_URL+'chat',
     { headers: this.headers, params: { userId: this.userId}})
  }
}
