import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './const';


// Models
import { Message } from 'src/app/models/message.model';

// Services
import { SocketService } from './socket/socket.service';

// Const
const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private _http: HttpClient,
    private socketService: SocketService
  ) { }

  public async sendMessage(message:Message):Promise<any>{
    return new Promise((resolve, reject) => {
      this.send(message).subscribe((response) => {
        if(response.status === 'error') reject(response.message);
        if(response.errorCode) reject(response.message) // Type AppError class
        
        resolve(response);
      })
    })
  }

  private send(message:Message):Observable<any>{
      return this._http.post(global.API_URL+'message', { message: message }, {headers: httpHeaders});
  }
}
