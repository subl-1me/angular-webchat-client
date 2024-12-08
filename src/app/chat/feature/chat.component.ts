import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  DoCheck,
} from '@angular/core';

import { AuthService } from 'src/app/shared/services/user/auth.service';

import { Message } from 'src/app/shared/models/message.model';
import { MessageService } from '../data-access/message.service';

import { SocketService } from 'src/app/shared/services/socket.service';
import { ImageService } from '../utils/image.service';

import { UsersTypingService } from 'src/app/shared/services/users-typing.service';

import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { ChatService } from '../data-access/chat.service';
import { ChatListService } from 'src/app/chat-list/access-data/chat-list.service';
import { Chat } from 'src/app/shared/models/chat.model';

import { User } from 'src/app/shared/models/user.model';
import { GLOBAL } from '../../shared/const';
import { CloudinaryService } from '../data-access/cloudinary.service';

// CHAT SCROLL DOWN EVENTS
const { SEND_MESSAGE_EVENT, OPEN_CHAT_EVENT, SEE_UNREAD_MESSAGES_EVENT } =
  GLOBAL.CHAT_SCROLL_DOWN_EVENT_CASES;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [
    SocketService,
    ImageService,
    ChatService,
    CloudinaryService,
    MessageService,
    UsersTypingService,
  ],
})
export class ChatComponent implements OnInit, OnChanges, DoCheck {
  @Input() selectedChat: Chat;
  @Output() removedChatId = new EventEmitter<string>();

  // Icons
  faPaperPlane = faPaperPlane;
  faEllipsisV = faEllipsisV;
  faDoorOpen = faDoorOpen;
  faXmark = faXmark;
  faUserPlus = faUserPlus;
  faGear = faGear;
  faImage = faImage;
  faPlus = faPlus;
  faTrash = faTrash;
  faUsers = faUsers;
  faMinus = faMinus;
  faPenToSquare = faPenToSquare;

  public message: Message;
  public isUploading: boolean = false;
  public userAuth: User = {
    username: '',
    email: '',
  };
  public inviteType: string = '';
  public isFirstLoad: boolean = false;

  public SEE_UNREAD_MESSAGES_EVENT = SEE_UNREAD_MESSAGES_EVENT;

  public usersTyping: User[] = [];

  public unreadMessagesCounter: number;
  public hasUnreadMessages: boolean;

  public loadedImages: any;
  public imageServiceMessage: string = '';

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private chatService: ChatService,
    private socketService: SocketService,
    private imageService: ImageService,
    private cloudinaryService: CloudinaryService,
    private chatListService: ChatListService,
    private usersTypingService: UsersTypingService
  ) {
    this.loadedImages = [];
    this.selectedChat = { _id: '', participants: [], messages: [] };
    this.userAuth = this.authService.getUser();

    this.unreadMessagesCounter = 0;
    this.hasUnreadMessages = false;

    this.message = {
      chat: this.selectedChat,
      content: '',
      user: this.userAuth._id,
    };
    this.usersTyping = this.usersTypingService.users;
  }

  ngOnInit(): void {
    this.listenMessages();
  }

  private listenMessages(): void {
    this.socketService.messageListener.subscribe((message) => {
      if (message.chat !== this.selectedChat._id) {
        return;
      }

      let chatContainerScrollElem = document.getElementById('container-scroll');
      if (
        chatContainerScrollElem &&
        chatContainerScrollElem.scrollTop < chatContainerScrollElem.scrollHeight
      ) {
        this.hasUnreadMessages = true;
        this.unreadMessagesCounter++;
      }
    });
  }

  ngDoCheck(): void {
    this.usersTyping = this.usersTypingService.users;
    this.isFirstLoad = !!localStorage.getItem('isFirstLoad');

    let chatContainerScrollElem = document.getElementById('container-scroll');
    // console.log(chatContainerScrollElem?.scrollTop);
    // console.log(chatContainerScrollElem?.scrollHeight);
    // if (
    //   chatContainerScrollElem &&
    //   chatContainerScrollElem.scrollTop === chatContainerScrollElem.scrollHeight
    // ) {
    //   this.unreadMessagesCounter = 0;
    //   this.hasUnreadMessages = false;
    // }
  }

  ngOnChanges(changes: SimpleChanges): void {
    let chatChanges = changes['selectedChat'];
    if (chatChanges.currentValue._id === '') return; // empty case

    this.selectedChat = changes['selectedChat'].currentValue;
    this.setScrollDown(OPEN_CHAT_EVENT);
    // if chat selected changed clear temp loaded images
    this.loadedImages = this.imageService.clear();
  }

  public setScrollDown(when: string): void {
    let chatContainerScrollElem = document.getElementById('container-scroll');
    let heightRestant = 0;
    switch (when) {
      case SEND_MESSAGE_EVENT:
        heightRestant = chatContainerScrollElem
          ? chatContainerScrollElem.scrollHeight -
            chatContainerScrollElem.scrollTop
          : 0;
        if (chatContainerScrollElem) {
          chatContainerScrollElem.scrollTop =
            chatContainerScrollElem.scrollHeight;
        }
        break;
      case OPEN_CHAT_EVENT:
        heightRestant = chatContainerScrollElem
          ? chatContainerScrollElem.scrollHeight -
            chatContainerScrollElem.scrollTop
          : 0;
        if (chatContainerScrollElem) {
          chatContainerScrollElem.scrollTop = heightRestant;
        }
        break;
      case SEE_UNREAD_MESSAGES_EVENT:
        this.unreadMessagesCounter = 0;
        this.hasUnreadMessages = false;
        if (chatContainerScrollElem) {
          chatContainerScrollElem.scrollTop =
            chatContainerScrollElem.scrollHeight;
        }
        break;
      default:
        break;
    }
  }

  private checkScroll(): void {
    let chatDiv = document.getElementById('container-scroll');
    if (!chatDiv) {
      return;
    }
    let heightRestant = chatDiv?.scrollHeight - chatDiv?.scrollTop;
    let actualScroll = chatDiv.scrollTop;
    console.log('total scroll', chatDiv.scrollHeight);
    console.log('restant:', heightRestant);
    console.log('actual scroll:', actualScroll);
    if (actualScroll + heightRestant < chatDiv.scrollHeight) {
      console.log('scrolling up. Showing new messages');
    }

    if (actualScroll + heightRestant === chatDiv.scrollHeight) {
      console.log('Its down. Not scrolling');
    }
  }

  public stringAsDate(date: any) {
    return new Date(date);
  }

  public sendMessage(): void {
    this.usersTypingService.resetTyping();
    if (this.message.content === '' && this.loadedImages.length < 1) return; // Empty case return

    this.setScrollDown('SEND_MESSAGE');
    this.message.chat = this.selectedChat._id;
    this.messageService.sendMessage(this.message).subscribe((response) => {
      if (response.message === 'Chat expired.') {
        // Chat was expired, handle first
        alert(`This chat was expired. All data will be removed.`);
        this.closeChat();
        this.chatListService.filterChatById(this.selectedChat._id);
        return;
        // Pending remove chat from list :pp
      }

      if (response.errorCode || response.status === 'error') return; // Pending to add feedback

      // Send socket with new message
      this.message.content = '';
      this.socketService.sendNewMessage(response.message);
      if (this.loadedImages.length === 0) return; // No images attached
      if (this.isUploading) return;
      this.uploadAttachedImages(response.message._id);
    });
  }

  // send "someone is typing" message
  public userIsTyping(event: any) {
    const user = this.authService.getUser();
    if (!user) {
      return;
    }
    this.usersTypingService.userTypingEvent(user);
  }

  private uploadAttachedImages(messageId: string): void {
    let formData = this.imageService.createFormData();
    this.isUploading = true;
    this.setElementsLoadingStatus();

    // append message id to form data to use it on backend
    formData.append('messageId', messageId);
    this.cloudinaryService.uploadImages(formData).subscribe((response) => {
      if (response.error || response.status === 'error') return; // Pending add feedback

      // if files uploaded update message.images
      this.messageService
        .insertImages(response.images, messageId)
        .subscribe((response) => {
          if (response.error || response.status === 'error') return;

          this.isUploading = false;
          this.loadedImages = this.imageService.clear();

          response.message.content = '';
          this.socketService.sendNewMessage(response.message);
        });
    });
  }

  private setElementsLoadingStatus(): void {
    let images = document.getElementsByClassName('img-pre-loaded');
    // Images loading status
    for (let i = 0; i < images.length; i++) {
      let imageElement = <HTMLElement>images[i];
      imageElement.style.opacity = '0.2';
    }

    // Xmark icons disabled
    let xMarkIcons = document.getElementsByClassName('xMarkIcon');
    for (let i = 0; i < xMarkIcons.length; i++) {
      let element = <HTMLElement>xMarkIcons[i];
      element.style.opacity = '0.1';
    }

    // Add photo disabled while uploading
    let btnAddElement = document.getElementById('btn-add');
    if (btnAddElement) {
      btnAddElement.style.opacity = '0.3';
      btnAddElement.classList.remove('bg-add');
    }
  }

  public leaveChat(): void {
    if (!this.userAuth._id) {
      return;
    }
    this.chatService
      .updateParticipants(this.selectedChat._id, this.userAuth._id, 'remove')
      .subscribe((response) => {
        if (response.error || response.status === 'error') return; // Something went wrong. Pending to add feedback

        this.removedChatId.emit(this.selectedChat._id);
        localStorage.removeItem('teAmoJazmin');
        // this.chatListService.loadItems();

        const userToRemove = this.authService.getUser();
        const chatId = this.selectedChat._id;
        this.selectedChat = { _id: '', participants: [], messages: [] };
        this.socketService.updateParticipantList(
          userToRemove,
          'remove',
          chatId
        );
      });
  }

  public closeChat(): void {
    this.selectedChat = { _id: '', participants: [], messages: [] };
    this.removedChatId.emit('none');
    localStorage.removeItem('activedChatId');
  }

  public scrollBottom(): void {
    const chatDiv = document.getElementById('container-scroll');
    if (chatDiv) {
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  }

  public setInviteType(): void {
    this.inviteType = 'group';
    localStorage.setItem('inviteType', 'group');
  }

  public attachImage(event: any): void {
    const file = <File>event.target.files[0];
    const handlerResponse = this.imageService.handleImage(file);
    if (handlerResponse instanceof String) {
      this.imageServiceMessage = <string>handlerResponse;
      return;
    }
    this.imageServiceMessage = '';

    this.loadedImages = this.imageService.getImages();
  }

  public removeImage(image: any): void {
    if (this.isUploading) return; // case if is already uploading images
    this.imageServiceMessage = '';
    this.loadedImages = this.imageService.remove(image);
  }

  public clearChat(): void {
    this.selectedChat.messages = [];
  }
}
