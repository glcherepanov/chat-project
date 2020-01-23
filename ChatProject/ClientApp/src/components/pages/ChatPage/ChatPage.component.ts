import { MessageDto } from './../../../dto/message/MessageDto';
import { Component } from '@angular/core';
import { ChatHttpService } from './../../../HttpServices/ChatHttpService';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { ChatDto } from '../../../dto/chat/ChatDto';

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
  public chat: ChatDto;
  public newPath: string;
  public isChangeImage: boolean = false;

  public constructor(chatHttpService: ChatHttpService, private _cookie: CookieService, route: ActivatedRoute) {
    this._chatHttpService = chatHttpService;
    this.message.userLogin = this._cookie.get('login');

    route.params.subscribe(params => {
      this.message.chatId = params['id'] !== undefined
        ? Number(params['id'])
        : 0;
      this.reloadMessages();
      this.reloadChat();
    });
  }

  private reloadMessages(): void {
    this._chatHttpService.getMessages( this.message.chatId ).subscribe(values => {
      this.messages = values;
    });
  }

  private reloadChat(): void {
    this._chatHttpService.getChat( this.message.chatId ).subscribe(values => {
      this.chat = values;
    });
  }

  public changeImage(): void {
    console.log(this.chat);
    this._chatHttpService.changeChatImage( this.chat.id, this.newPath ).subscribe();
    this.reloadChat();
    this.isChangeImage = false;
  }

  public change(): void {
    this.isChangeImage = this.isChangeImage === false ? true : false;
  }

  public send(): void {
    this.message.date = new Date();
    const _this = this;
    let send: boolean;
    this._chatHttpService.sendMessage( this.message ).subscribe({
      next(response: boolean) { send = response; },
      complete() {
        if ( send ) {
          _this.reloadMessages();
          _this.message.text = '';
        } else {
          console.log( 'Error send message' );
        }
       }
     });
  }

  public dateToString(date: Date): string {
    return date.toLocaleString();
  }
}
