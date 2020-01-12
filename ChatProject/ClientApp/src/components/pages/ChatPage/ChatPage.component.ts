import { MessageDto } from './../../../dto/message/MessageDto';
import { Component } from '@angular/core';
import { ChatHttpService } from './../../../HttpServices/ChatHttpService';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

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


  public currChatId: number;

  public constructor(chatHttpService: ChatHttpService, route: ActivatedRoute) {
    this._chatHttpService = chatHttpService;

    route.params.subscribe(params => {
      const _currChatId: number | undefined = params['id'] !== undefined
        ? Number(params['id'])
        : 0;
      this.currChatId = _currChatId;
      // this.reloadMessages();
    });
  }

  private reloadMessages(): void {
    this._chatHttpService.getMessages(this.currChatId).subscribe(values => {
      this.messages = values;
    });
  }

  public sendMessage(): void {
    console.log("Send message complete");
  }

  public dateToString(date: Date): string {
    return date.toLocaleString();
  }
}
