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
  public message: MessageDto = {
    messageId: 3,
    dateSend: new Date(),
    textMessage: 'message3'
  };
  public messages: MessageDto[] = [
    this.message, this.message
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

  public makeSendMessage(): SendMessageDto {
    const sendMessage: SendMessageDto = new SendMessageDto;
    sendMessage.sendChatId = ;
    sendMessage.sendUserLogin = this.userLogin;
    sendMessage.message = ;

    return sendMessage;
  }

  public sendMessage(): void {
    console.log("Send message complete");
  }

  public dateToString(date: Date): string {
    return date.toLocaleString();
  }
}
