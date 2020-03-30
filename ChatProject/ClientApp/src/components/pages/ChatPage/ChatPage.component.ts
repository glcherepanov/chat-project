import { MessageDto } from './../../../dto/message/MessageDto';
import { Component, NgZone } from '@angular/core';
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
  public havePermision: boolean = false;

  public constructor(chatHttpService: ChatHttpService, private _cookie: CookieService, private _ngZone: NgZone, route: ActivatedRoute) {
    this._chatHttpService = chatHttpService;
    this.message.userLogin = this._cookie.get('login');
    route.params.subscribe(params => {
      this.message.chatId = params['id'] !== undefined
        ? Number(params['id'])
        : 0;
      this.reloadMessages();
      this.reloadChat();
    });

    this.isHavePermision();
    console.log(this.havePermision);
  }

  private isHavePermision(): void {
    this._chatHttpService.havePermision(this.message.chatId, this.message.userLogin).subscribe(value => {
      this.havePermision = value;
    });
  }

  private reloadMessages(): void {
    this._chatHttpService.getMessages(this.message.chatId).subscribe(values => {
      this.messages = values;
    });

    this._chatHttpService.messageReceived.subscribe((message: MessageDto) => {
      this._ngZone.run(() => {
        this.messages.push(message);
      });
    });
  }

  private reloadChat(): void {
    this._chatHttpService.getChat(this.message.chatId).subscribe(values => {
      this.chat = values;
    });
  }

  public changeImage(): void {
    this._chatHttpService.changeChatImage(this.chat.id, this.newPath).subscribe();
    this.reloadChat();
    this.isChangeImage = false;
  }

  public change(): void {
    this.isChangeImage = this.isChangeImage === false ? true : false;
  }

  public send(): void {
    this.message.date = new Date();
    let send: boolean;
    this._chatHttpService.sendMessage(this.message).subscribe({
      next(response: boolean) { send = response; },
      complete() {
        if (send) {
          (<HTMLInputElement>document.getElementById('textMessageForm')).value = '';
          console.log('Send message');
        } else {
          console.log('Error send message');
        }
      }
    });
  }
}
