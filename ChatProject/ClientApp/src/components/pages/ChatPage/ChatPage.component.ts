import { MessageDto } from './../../../dto/message/MessageDto';
import { SendMessageDto } from './../../../dto/message/SendMessageDto';
import { Component } from '@angular/core';
import { ChatHttpService } from './../../../HttpServices/ChatHttpService';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-chat',
  templateUrl: './ChatPage.component.html',
  styleUrls: ['./ChatPage.component.scss'],
  providers: [ChatHttpService, DatePipe]
})

export class ChatPageComponent {
  private readonly _chatHttpService: ChatHttpService;
  public message: string;
  public dateSendMessage: Date = new Date();
  public messageGet: MessageDto = {
    messageId: 3,
    dateSend: new Date(),
    textMessage: 'message3'
  };
  public messages: MessageDto[] = [
    this.messageGet, this.messageGet
  ];

  public userLogin: string;
  public currChatId: number;

  public constructor(chatHttpService: ChatHttpService, private _cookie: CookieService, route: ActivatedRoute) {
    this._chatHttpService = chatHttpService;
    this.userLogin = this._cookie.get('login');

    route.params.subscribe(params => {
      const _currChatId: number | undefined = params['id'] !== undefined
        ? Number(params['id'])
        : 0;
      this.currChatId = _currChatId;
      //this.reloadMessages();
    });
  }

  private reloadMessages(): void {
    this._chatHttpService.getMessages(this.currChatId).subscribe(values => {
      this.messages = values;
    });
  }

  public send(): void {
    const messageForSend: SendMessageDto = new SendMessageDto;
    messageForSend.sendChatId = this.currChatId;
    messageForSend.sendUserLogin = this.userLogin;
    messageForSend.message.textMessage = this.message;
    messageForSend.message.dateSend = this.dateSendMessage;

    console.log("Send message complete");
    this._chatHttpService.sendMessage(messageForSend);
  }

  public dateToString(date: Date): string {
    return date.toLocaleString();
  }
}
