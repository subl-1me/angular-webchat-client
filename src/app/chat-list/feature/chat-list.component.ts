import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  DoCheck,
} from '@angular/core';
import * as moment from 'moment';

// Icons
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from 'src/app/shared/services/user/auth.service';
import { User } from 'src/app/shared/models/user.model';

import { RequestService } from 'src/app/shared/services/request.service';

import { ChatListService } from '../access-data/chat-list.service';
import { Chat } from '../models/chat.model';

import { Message } from 'src/app/shared/models/message.model';
import { SocketService } from 'src/app/shared/services/socket.service';

import { GLOBAL } from 'src/app/shared/const';
// CHAT SCROLL DOWN EVENTS
const { SEND_MESSAGE_EVENT, OPEN_CHAT_EVENT } =
  GLOBAL.CHAT_SCROLL_DOWN_EVENT_CASES;

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css'],
  providers: [SocketService, ChatListService, RequestService, AuthService],
})
export class ChatListComponent implements OnInit, OnChanges, DoCheck {
  @Output() selectedChat = new EventEmitter<Chat>();
  @Input() removedChatId: string = '';

  faChevronDown = faChevronDown;

  public chats: Chat[];
  public messageNotifications: any = [];
  public userAuth: User = {
    username: '',
    email: '',
  };
  public lastMessage: Message = { content: '', chat: '', user: '' };
  public isListLoading: boolean = false;

  constructor(
    private chatListService: ChatListService,
    private authService: AuthService,
    private socketService: SocketService
  ) {
    this.chats = this.chatListService.chats;
    this.userAuth = this.authService.getUser();
  }

  ngOnInit(): void {
    this.listenMessages();
    this.loadNotifications();
    // this.chatListener();
  }

  ngDoCheck(): void {
    this.chats = this.chatListService.chats;
    this.isListLoading = this.chatListService.loading;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['removedChatId'] || this.removedChatId === '') return;

    this.chatListService.filterChatById(this.removedChatId);
    this.chats = this.chats.filter((chat) => chat._id !== this.removedChatId);
    this.removedChatId = '';
  }

  private loadNotifications(): void {
    let notifications = localStorage.getItem('notifications');
    if (notifications) {
      this.messageNotifications = JSON.parse(notifications);
    }
  }

  private setScrollDown(): void {
    let chatContainerScrollElem = document.getElementById('container-scroll');
    let heightRestant = 0;
    heightRestant = chatContainerScrollElem
      ? chatContainerScrollElem.scrollTop - chatContainerScrollElem.scrollHeight
      : 0;
    if (chatContainerScrollElem) {
      chatContainerScrollElem.scrollTop = chatContainerScrollElem.scrollHeight;
    }
  }

  private listenMessages(): void {
    // Recieve new messages notifications
    this.socketService.messageListener.subscribe((message) => {
      let targetChat = this.chats.find((chat) => chat._id === message.chat);
      if (!targetChat) return; // If user doesnt have chat in his list
      let activedChatId = localStorage.getItem('activedChatId') || '';

      // targetChat.messages.push(message);
      localStorage.setItem('isFirstLoad', 'true');
      this.chatListService.addMessageToChat(targetChat._id, message);

      const auth = this.authService.getUser();

      if (activedChatId !== message.chat) {
        let isChatCaptured = this.messageNotifications.find(
          (notif: any) => notif.chatId === message.chat
        );
        if (isChatCaptured) {
          isChatCaptured.counter++;
        } else {
          this.messageNotifications.push({
            chatId: message.chat,
            counter: 1,
          });
        }

        // Store new messages
        localStorage.setItem(
          'notifications',
          JSON.stringify(this.messageNotifications)
        );
        return;
      }

      if (message.user._id === auth._id) {
        this.setScrollDown();
      }
    });
  }

  public stringAsDate(date: any) {
    return new Date(date);
  }

  public openChat(event: any, chat: Chat): void {
    const currentActiveChatId = localStorage.getItem('activedChatId');
    if (currentActiveChatId && currentActiveChatId === chat._id) {
      console.log('Chat is current active.');
      return;
    }

    localStorage.setItem('activedChatId', chat._id);
    localStorage.setItem('isFirstLoad', 'false');
    this.selectedChat.emit(chat);

    // reset notifications
    this.messageNotifications = this.messageNotifications.filter(
      (notif: any) => notif.chatId !== chat._id
    );
    localStorage.setItem(
      'notifications',
      JSON.stringify(this.messageNotifications)
    );
  }

  /**
   * Apply focus class to show selected chat
   * @param chatId
   */
  private focusSelectedChat(chatId: string): void {
    let selectedChatDiv = <HTMLElement>(
      document.getElementById('chat-' + chatId)
    );
    if (selectedChatDiv) {
      selectedChatDiv.classList.add('chat-selected');
    }
  }

  public returnRemainingSeconds(expireAt: Date, expiredChatId: string): number {
    if (!expiredChatId) return 0;
    let now = moment();

    console.log(now.diff(expireAt, 'seconds'));
    let remainingSeconds = Math.abs(now.diff(expireAt, 'seconds'));

    if (remainingSeconds === 0) {
      this.chats = this.chats.filter((chat) => chat._id !== expiredChatId);
      return 0;
    }

    return remainingSeconds;
  }
}
