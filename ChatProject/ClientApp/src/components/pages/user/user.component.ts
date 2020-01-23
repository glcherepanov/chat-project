import { Component } from '@angular/core';
import { UserDto } from '../../../dto/user/UserDto';
import { UserType } from '../../../dto/user/UserType';
import { UserHttpService } from '../../../HttpServices/UserHttpService';
import { CookieService } from 'ngx-cookie-service';
import { Md5 } from 'md5-typescript';
import { MessageDto } from '../../../dto/message/MessageDto';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  providers: [UserHttpService, CookieService]
})

export class UserComponent {
  private readonly _userHttpService: UserHttpService;
  public users: UserDto[];
  public mainUser: UserDto = new UserDto();
  public oldpass: string;
  public newpass: string;
  public start: Date;
  public end: Date;
  public userMessages: MessageDto[] = [];

  public constructor(userHttpService: UserHttpService, private _cookie: CookieService) {
    this._userHttpService = userHttpService;
    this.reloadUserData();
    this.reloadUsersList();
  }

  private reloadUserData(): void {
    this._userHttpService.getUser( this._cookie.get( 'login' ) ).subscribe(value => {
      this.mainUser = value;
    });
  }

  private reloadUsersList(): void {
    this._userHttpService.getUsers().subscribe(values => {
      this.users = values;
    });
  }

  public deleteUser(id: number): void {
    this._userHttpService.removeUser(id).subscribe(() => {
      this.reloadUserData();
    });
  }

  public openChangePasswordBlock(blockId: string): void {
    if (document.getElementById(blockId).style.display == 'none') {
      document.getElementById(blockId).style.display = 'block';
    }
  }

  public changePassword(blockId: string): void {
    if (this._userHttpService.login(this.mainUser.login, Md5.init(this.oldpass)) && !(this.oldpass === this.newpass)) {
      console.log('Old password done!');
      this.mainUser.password = Md5.init(this.newpass);
      console.log(this.mainUser.password);
      //написать в userHttpService функцию для changePassword
    } else {
      if (document.getElementById(blockId).style.display == 'none') {
        document.getElementById(blockId).style.display = 'block';
      }
    }
  }

  public getUserType(type: UserType): string {
    switch (type) {
      case UserType.Admin:
        return 'Админ';
      case UserType.User:
        return 'Пользователь';
      default:
        return 'бан';
    }
  }

  public messages(): void {
    this._userHttpService.messages( this._cookie.get('login'), this.start, this.end ).subscribe(value => {
      this.userMessages = value;
    });
  }
}
