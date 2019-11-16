import { MessageDto } from './../dto/message/MessageDto';
import { ChatDto } from './../dto/chat/ChatDto';
import { HttpService } from './HttpService';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ChatHttpService {
    private readonly _httpService: HttpService;

    public constructor(httpService: HttpService) {
        this._httpService = httpService;
    }

    public getChats(): Observable<ChatDto[]> {
        return this._httpService.get<ChatDto[]>('api/ChatApi/');
    }

    public getMessages(chatId: number): Observable<MessageDto> {
        const params: HttpParams = new HttpParams()
            .set('chatId', chatId.toString());
        return this._httpService.get<MessageDto>('api/ChatApi/message', params);
    }
}
