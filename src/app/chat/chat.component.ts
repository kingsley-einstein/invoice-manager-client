import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  message: string = '';

  @Input()
  userId: any;

  @Input()
  userRole: any;

  messages: {}[] = [];

//z = `${new Date().getHours()}`

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatService.initConnection(this.messages);
  }

  ngOnDestroy() {
    this.chatService.leaveChat();
  }

  sendMessage() {
    this.chatService.sendMessage({
      userId: this.userId,
      userRole: this.userRole,
      message: this.message,
      on: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
    });

    this.message = '';
  }

}
