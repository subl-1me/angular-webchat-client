import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Chat } from '../models/chat';

import { GLOBAL } from '../shared/const';

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public chats: Chat[] = [];

  constructor(private _http: HttpClient) {}

  public initChat(request: any): Observable<any> {
    return this._http.post(GLOBAL.API_URL + 'chat', request, {
      headers: headers,
    });
  }

  /**
   * Get chat list of specific user
   * @param userId
   * @returns Server response
   */
  public items(userId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getList(userId).subscribe((response) => {
        if (response.status === 'error') reject(response.message);

        this.chats = response.chats;
        resolve(response.chats);
      });
    });
  }

  // Pending to implement
  public item(chatId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getChat(chatId).subscribe((response) => {
        if (response.status === 'error') reject(response.message);

        resolve(response.chat);
      });
    });
  }

  /**
   * Update participant list of current chat.
   * @param chatId  Current chat
   * @param userId Self user _id
   * @param action Refers to add or remove only
   * @returns Success or error confirmation
   */
  public updateParticipants(
    chatId: string,
    userId: string,
    action: string
  ): Promise<any> {
    if (chatId === '') throw new Error('Chat ID is required.');

    return new Promise((resolve, reject) => {
      this.update(chatId, userId, action).subscribe((response) => {
        if (response.status === 'error') reject(response.message);

        resolve('success');
      });
    });
  }

  private getChat(chatId: string): Observable<any> {
    return this._http.get(GLOBAL.API_URL + 'chat/active', {
      headers: headers,
      params: { chatId: chatId },
    });
  }

  public removeActiveChat(chatId: string): Observable<any> {
    return this._http.delete(GLOBAL.API_URL + 'chat', {
      headers: headers,
      params: { chatId: chatId },
    });
  }

  private update(
    chatId: string,
    userId: string,
    action: string
  ): Observable<any> {
    return this._http.put(
      GLOBAL.API_URL + 'chat',
      { userId, action },
      { headers: headers, params: { chatId: chatId } }
    );
  }

  private getList(userId: string): Observable<any> {
    return this._http.get(GLOBAL.API_URL + 'chat', {
      headers: headers,
      params: { userId: userId },
    });
  }

  public filterActivedChats(chats: Chat[], users: any): any {
    users = users.map((_user: any) => {
      return chats.map((chat) => chat.participants === _user._id);
    });
  }
}
