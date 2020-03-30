import { MessageDto } from './../dto/message/MessageDto';
import { SendMessageDto } from './../dto/message/SendMessageDto';
import { ChatDto } from './../dto/chat/ChatDto';
import { HttpService } from './HttpService';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable()
export class ChatHttpService {
  private readonly _httpService: HttpService;
  private _hubConnection: HubConnection;
  private connectionIsEstablished = false;
  connectionEstablished = new EventEmitter<Boolean>();
  messageReceived = new EventEmitter<string>();

  public constructor(httpService: HttpService) {
    this._httpService = httpService;
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:44338/chat-list')
      .build();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(function () { this.startConnection(); }, 5000);
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('MessageReceived', (data: any) => {
      this.messageReceived.emit(data);
    });
  }

  public havePermision(id: number, login: string): Observable<boolean> {
    const params: HttpParams = new HttpParams()
      .set('id', id.toString())
      .set('login', login);
    return this._httpService.get<boolean>('api/chat/permission', params);
  }

  public getChats(login: string): Observable<ChatDto[]> {
    const params: HttpParams = new HttpParams()
      .set('login', login.toString());
    return this._httpService.get<ChatDto[]>('api/chat/chats', params);
  }

  public getChat(id: number): Observable<ChatDto> {
    const params: HttpParams = new HttpParams()
      .set('id', id.toString());
    return this._httpService.get<ChatDto>('api/chat/', params);
  }

  public getMessages(chatId: number): Observable<MessageDto[]> {
    const params: HttpParams = new HttpParams()
      .set('id', chatId.toString());
    return this._httpService.get<MessageDto[]>('api/chat/messages', params);
  }

  public sendMessage(message: SendMessageDto): Observable<boolean> {
    this._hubConnection.invoke('NewMessage', message);
    return this._httpService.post<SendMessageDto, boolean>('api/chat/send', message);
  }

  public changeChatImage(id: number, path: string): Observable<boolean> {
    const params: HttpParams = new HttpParams()
      .set('id', id.toString())
      .set('path', path);
    return this._httpService.post<HttpParams, boolean>('api/chat/change-image', params);
  }

  public addChat(chat: ChatDto): Observable<number> {
    return this._httpService.post<ChatDto, number>('api/chat/add', chat);
  }

  public AddUserToChat(id: number, login: string): Observable<boolean> {
    const params: HttpParams = new HttpParams()
      .set('id', id.toString())
      .set('login', login);
    return this._httpService.post<HttpParams, boolean>('api/chat/add-user', params);
  }
}
