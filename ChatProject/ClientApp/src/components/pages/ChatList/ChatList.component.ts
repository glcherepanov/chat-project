import { Component } from '@angular/core';
import { ChatDto } from './../../../dto/chat/ChatDto';
import { ChatHttpService } from './../../../HttpServices/ChatHttpService';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-chat-list',
    templateUrl: './ChatList.component.html',
    providers: [ChatHttpService]
})

export class ChatListComponent {
    private readonly _chatHttpService: ChatHttpService;
    public chats: ChatDto[];

    public constructor(chatsService: ChatHttpService, private cookie: CookieService) {
        this._chatHttpService = chatsService;
        this.reloadChats();
    }

    private reloadChats(): void {
        this._chatHttpService.getChats( this.cookie.get('login') ).subscribe(values => {
          this.chats = values;
        });
    }
}
