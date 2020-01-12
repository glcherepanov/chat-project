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

    public getChats( login: string ): Observable<ChatDto[]> {
        const params: HttpParams = new HttpParams()
            .set('login', login.toString());
        return this._httpService.get<ChatDto[]>('api/chat', params);
    }

    public getMessages(chatId: number): Observable<MessageDto[]> {
        const params: HttpParams = new HttpParams()
            .set('chatId', chatId.toString());
        return this._httpService.get<MessageDto[]>('api/chat/message', params);
  }

    protected makeSendMessage(): void {
      const sendMessage: SendMessageDto = new SendMessageDto;
      sendMessage.sendChatId = ;
      sendMessage.sendUserId = ;
      sendMessage.message = ;
      this._httpService.makeMessage(sendMessage).subscribe(value => {
        alert('Сообщение отправлено');
      });
    }

  public sendMessage(sendMessage: SendMessageDto): Observable<SendMessageDto> {
    return this._httpService.post<SendMessageDto, SendMessageDto>('');
  }
}
