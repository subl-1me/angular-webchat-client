import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

import { GLOBAL } from 'src/app/shared/const';
import { Message } from 'src/app/shared/models/message.model';
import { AuthService } from 'src/app/shared/services/user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private headers:HttpHeaders;
  private readonly API_URL:string = GLOBAL.API_URL;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { 
    this.headers = new HttpHeaders({
      'Authorization': this.authService.getToken(),
      'Content-Type': 'application/json'
    })
  }

  public sendMessage(message:Message):Observable<any>{
    // this.authService.parseUserCredentials();
    return this.http.post(this.API_URL+'message',
     { message: message }, { headers: this.headers }).pipe(
      tap(),
      catchError(this.handleError<Message>('sendMessage', message))
    );
  }

  public insertImages(images:any, messageId:string):Observable<any>{
    return this.http.put(this.API_URL+'message', { images },
     { headers: this.headers, params: { messageId: messageId }})
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
