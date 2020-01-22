import { MessageDto } from './../../../dto/message/MessageDto';
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
  public message: MessageDto = new MessageDto;
  public messages: MessageDto[];

  public constructor(chatHttpService: ChatHttpService, private _cookie: CookieService, route: ActivatedRoute) {
    this._chatHttpService = chatHttpService;
    this.message.userLogin = this._cookie.get('login');

    route.params.subscribe(params => {
      this.message.chatId = params['id'] !== undefined
        ? Number(params['id'])
        : 0;
      this.reloadMessages();
    });
  }

  private reloadMessages(): void {
    this._chatHttpService.getMessages( this.message.chatId ).subscribe(values => {
      this.messages = values;
    });
  }

  public send(): void {
    this.message.date = new Date();
    this._chatHttpService.sendMessage( this.message ).subscribe();
  }

  public dateToString(date: Date): string {
    return date.toLocaleString();
  }
}
