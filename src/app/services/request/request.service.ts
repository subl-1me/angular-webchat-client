import { ElementRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Request } from 'src/app/models/request';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  public pendingRequests: Request[];

  constructor() {
    this.pendingRequests = [];
   }

  public insert(request:Request):void{
    this.pendingRequests.push(request);
  }

  public filterActivedRequests(users:User[]):User[]{
    users.forEach(user => {
      this.pendingRequests.forEach(request => {
        if(request.to.username === user.username){
          users = users.filter(_user => {
            return _user.username !== request.to.username;
          })
        }
      })
    })

    return users;
  }

  public updateRequestStatus(request:Request):void{
    const requestId = request._id;
    if(request.status === 'declined'){
      this.pendingRequests.forEach(request => {
        if(request._id === requestId) request.status = 'declined';
      })
    }

    if(request.status === 'accepted'){
      this.pendingRequests.forEach(request => {
        if(request._id === requestId) request.status = 'accepted';
      })
    }
  }

}
