import { Component } from '@angular/core';
import { UserDto } from '../../../dto/user/UserDto';
import { UserHttpService } from '../../../HttpServices/UserHttpService';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ChatHttpService } from '../../../HttpServices/ChatHttpService';
import { ChatDto } from '../../../dto/chat/ChatDto';
import { ChatType } from '../../../dto/chat/ChatType';

@Component({
  selector: 'app-chat-user-page',
  templateUrl: './chat-user-page.component.html',
  providers: [UserHttpService, ChatHttpService]
})

export class ChatUserPageComponent {
  private readonly _userHttpService: UserHttpService;
  public isFriend: boolean;
  public friend: UserDto = new UserDto();
  public friendLogin: string;
  private readonly userLogin: string;

  public constructor(userHttpService: UserHttpService, route: ActivatedRoute, private _cookie: CookieService, private _chatHttpService: ChatHttpService, private _router: Router) {
    this._userHttpService = userHttpService;
    route.params.subscribe(params => {
      this.friendLogin = params['login'];
    });

    this.userLogin = this._cookie.get('login');

    this.reloadUser();
    this.checkIsFriend();
  }

  private reloadUser(): void {
    this._userHttpService.getUser(this.friendLogin).subscribe(value => {
      this.friend = value;
    });
  }

  private checkIsFriend(): void {
    this._userHttpService.isFriend( this.userLogin, this.friendLogin ).subscribe( value => {
      this.isFriend = value;
    });
  }

  public remove(): void {
    this._userHttpService.removeFriend(this.userLogin, this.friendLogin).subscribe(() => {
      this.checkIsFriend();
    });
  }

  public add(): void {
    this._userHttpService.addFriend(this.userLogin, this.friendLogin).subscribe(() => {
      this.checkIsFriend();
    });
  }

  public write(): void {
    const chat: ChatDto = new ChatDto;
    chat.name = this._cookie.get('login') + '_' + this.friendLogin;
    chat.type = ChatType.Group;
    const login = this._cookie.get('login');
    const friend = this.friendLogin;
    const service = this._chatHttpService;
    const router = this._router;

    let chatId: number;

    this._chatHttpService.addChat(chat).subscribe({
      next(response: number) { chatId = response; },
      complete() {
        service.AddUserToChat(chatId, login).subscribe();
        service.AddUserToChat(chatId, friend).subscribe();
        router.navigateByUrl('/chat-list/' + chatId);
      }
    });

  }
}
