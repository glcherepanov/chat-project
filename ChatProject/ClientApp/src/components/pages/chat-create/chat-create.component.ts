import { Component } from '@angular/core';
import { ChatDto } from './../../../dto/chat/ChatDto';
import { ChatHttpService } from './../../../HttpServices/ChatHttpService';
import { UserHttpService } from '../../../HttpServices/UserHttpService';
import { CookieService } from 'ngx-cookie-service';
import { UserDto } from '../../../dto/user/UserDto';

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

  public constructor(chatsService: ChatHttpService, userService: UserHttpService, private cookie: CookieService) {
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
    if ((undefined === this.nameConversation) || (this.selectUsers.length < 2)) {
      document.getElementById(idBlock).style.display = "block";
    } else {
      console.log(this.nameConversation);
      console.log(this.selectUsers);
    }

  }
}
