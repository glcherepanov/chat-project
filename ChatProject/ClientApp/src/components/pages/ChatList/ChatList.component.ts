import { Component } from '@angular/core';
import { ChatDto } from './../../../dto/chat/ChatDto';
import { ChatHttpService } from './../../../HttpServices/ChatHttpService';

@Component({
    selector: 'app-chat-list',
    templateUrl: './ChatList.component.html',
    providers: [ChatHttpService]
})

export class ChatListComponent {
    private readonly _chatHttpService: ChatHttpService;
    public chats: ChatDto[];

    public constructor(chatsService: ChatHttpService) {
        this._chatHttpService = chatsService;
        this._chatHttpService.getChats().subscribe(values => {
            this.chats = values;
        });
        this.reloadChats();
    }

    private reloadChats(): void {
        this._chatHttpService.getChats().subscribe(values => {
          this.chats = values;
        });
    }
}
