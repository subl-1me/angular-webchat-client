import { Component, OnInit, Input, DoCheck } from '@angular/core';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { ChatService } from '../data-access/chat.service';
import { SocketService } from 'src/app/shared/services/socket.service';

import { Request } from 'src/app/shared/models/request.model';
import { RequestService } from 'src/app/shared/services/request.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit, DoCheck {

  @Input() requests: Request[];
  public pendingRequests: Request[];

  public isLoading:boolean = false;

  // Icons
  faCheck = faCheck;
  faXmark = faXmark;
  faTrash = faTrash;

  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
    private requestService: RequestService
  ) {
    this.requests = [];
    this.pendingRequests = this.requestService.getPendingRequest();
   }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
      this.pendingRequests = this.requestService.getPendingRequest();
  }
  
  public declineRequest(request:Request):void{
    this.requestService.removeRequestsById(request._id);
  }

  public acceptRequest(request:Request):void{
    this.isLoading = true;

    if(request.type === 'duo') this.initChat(request);
    if(request.type === 'group') this.addUser(request);
  }

  private initChat(request:Request):void{
    // Init chat
    this.chatService.createChat(request).subscribe((response => {
      if(response.error || response.status === 'error') return;

      this.isLoading = false;
      this.requestService.removeRequestsById(request._id);

      // Send socket to refresh chat list
      this.socketService.sendNewChat(response.chat, request);
    }))
  }

  private addUser(request:Request):void{
    const chatId = request.chatId || '';
    const userId = request.to._id;
    this.chatService.addUser(chatId, userId, 'add').subscribe((response) => {
      if(response.errorCode) return;

      this.isLoading = false;
      const userToAdd = response.updatedChat.participants.find((user:User) => user._id === request.to._id);
      this.requestService.removeRequestsById(request._id);
      
      // send new participant to chat
      this.socketService.updateParticipantList(userToAdd, 'add', chatId);
      this.socketService.sendNewChat(response.updatedChat, request);
    })
  }

}