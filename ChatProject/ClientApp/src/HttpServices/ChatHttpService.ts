import { MessageDto } from './../dto/message/MessageDto';
import { SendMessageDto } from './../dto/message/SendMessageDto';
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

  public getChats(login: string): Observable<ChatDto[]> {
    const params: HttpParams = new HttpParams()
      .set('login', login.toString());
    return this._httpService.get<ChatDto[]>('api/chat', params);
  }

  public getMessages( chatId: number ): Observable<MessageDto[]> {
    const params: HttpParams = new HttpParams()
      .set('id', chatId.toString());
    return this._httpService.get<MessageDto[]>('api/chat/messages', params);
  }

  public sendMessage(message: SendMessageDto): Observable<boolean> {
    console.log( message );
    return this._httpService.post<SendMessageDto, boolean>('api/chat/send', message);
  }
}
