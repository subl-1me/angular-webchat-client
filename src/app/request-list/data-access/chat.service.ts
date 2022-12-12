import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GLOBAL } from 'src/app/shared/const';
import { Observable } from 'rxjs';
import { Request } from 'src/app/shared/models/request.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private readonly API_URL = GLOBAL.API_URL;
  private headers:HttpHeaders = new HttpHeaders().set('Conten-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  public createChat(request:Request):Observable<any>{
    return this.http.post(this.API_URL+'chat', request, {headers: this.headers});
  }

  /**
   * Update chat user list depending an action, only can be add or remove some user
   * @param chatId 
   * @param userId 
   * @param action 
   * @returns Updated chat
   */
  public addUser(chatId:string, userId:string, action:string):Observable<any>{
    return this.http.put
    (this.API_URL+'chat', { userId, action }, { headers: this.headers, params: { chatId: chatId }});
  }
}
