import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from 'src/app/shared/const';
import { Chat } from 'src/app/shared/models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private headers:HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  private readonly API_URL:string = GLOBAL.API_URL;

  constructor(
    private http: HttpClient,
  ) {}

  public updateParticipants(chatId:string, userId:string, action:string):Observable<any>{
    return this.http.put(this.API_URL+'chat', { userId, action }, { headers: this.headers, params: { chatId: chatId }})
  }
}
