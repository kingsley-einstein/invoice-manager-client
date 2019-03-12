import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url: string = environment.server;
  private socket: any;

  constructor() {
  }

  initConnection(messages: {}[]) {
    this.socket = io(this.url);
    this.socket.on('MESSAGE', (data) => {
      console.log(data);
      messages.push({
        userId: data.userId,
        userRole: data.userRole,
        message: data.message
      });
    });
  }

  sendMessage(message) {
    this.socket.emit('SEND_MESSAGE', message);
  }

  leaveChat() {
    this.socket.emit('LEAVE');
  }
}
