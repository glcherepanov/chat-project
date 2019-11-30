import { MessageDto } from './../../../dto/message/MessageDto';
import { Component } from '@angular/core';
import { ChatHttpService } from './../../../HttpServices/ChatHttpService';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-chat',
    templateUrl: './ChatPage.component.html',
    styleUrls: ['./ChatPage.component.scss'],
    providers: [ChatHttpService]
})

export class ChatPage {
    private readonly _chatHttpService: ChatHttpService;
    public messages: MessageDto[];
    public currChatId: number;
    
    public constructor(chatHttpService: ChatHttpService, route: ActivatedRoute) {
        this._chatHttpService = chatHttpService;
        
        route.params.subscribe(params => {
            const _currChatId: number | undefined = params['chatId'] !== undefined
            ? Number(params['chatId'])
            : 0;
            this.currChatId = _currChatId;
            this.reloadMessages();
        });
    }
    
    private reloadMessages(): void {
        this._chatHttpService.getMessages(this.currChatId).subscribe(values => {
            this.messages = values;
        });
    }
}
