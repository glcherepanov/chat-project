import { Component } from '@angular/core';
import { ChatDto } from './../../../dto/chat/ChatDto';
import { ChatHttpService } from './../../../HttpServices/ChatHttpService';
import { UserHttpService } from '../../../HttpServices/UserHttpService';
import { CookieService } from 'ngx-cookie-service';
import { UserDto } from '../../../dto/user/UserDto';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatType } from '../../../dto/chat/ChatType';
import { subscribeOn } from 'rxjs/operator/subscribeOn';

@Component({
  selector: 'app-chat-create',
  templateUrl: './chat-create.component.html',
  providers: [ChatHttpService, UserHttpService]
})

export class ChatCreateComponent {
  private readonly _chatHttpService: ChatHttpService;
  private readonly _userHttpService: UserHttpService;
  public nameConversation: string;
  public selectUsers: UserDto[] = [];
  public friends: UserDto[];

  public constructor(chatsService: ChatHttpService, userService: UserHttpService, private cookie: CookieService, private _router: Router) {
    this._chatHttpService = chatsService;
    this._userHttpService = userService;
    this.reloadFriends();
  }

  private reloadFriends(): void {
    this._userHttpService.getFriends(this.cookie.get('login')).subscribe(values => {
      this.friends = values;
    });
  }

  public createChatData(idBlock: string): void {
    if (undefined === this.nameConversation) {
      document.getElementById(idBlock).style.display = 'block';
    } else {
      this.add();
    }
  }

  public add(): void {
    const chat: ChatDto = new ChatDto;
    chat.name = this.nameConversation;
    chat.type = ChatType.Group;
    const login = this.cookie.get('login');
    const service = this._chatHttpService;
    const router = this._router;
    const usersForConv = this.selectUsers;

    let chatId: number;
    this._chatHttpService.addChat(chat).subscribe({
      next(id: number) { chat.id = id; },
      complete() {
        service.AddUserToChat(chat.id, login).subscribe();
        for (const user of usersForConv) {
          service.AddUserToChat(chat.id, user.login).subscribe();
        }
        setTimeout(function () {
          router.navigateByUrl('/chat-list/' + chat.id);
        }, 1000);
      }
    });
  }
}
