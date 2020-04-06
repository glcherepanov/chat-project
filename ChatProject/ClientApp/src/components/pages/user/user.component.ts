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
  styleUrls: ['./user.component.scss'],
  providers: [UserHttpService, CookieService]
})

export class UserComponent {
  private readonly _userHttpService: UserHttpService;
  public users: UserDto[];
  public mainUser: UserDto = new UserDto();
  public oldpass: string;
  public newpass: string;
  public newname: string;
  public errorChangePassword: boolean;
  public start: Date;
  public end: Date;
  public userMessages: MessageDto[] = [];

  public constructor(userHttpService: UserHttpService, private _cookie: CookieService) {
    this._userHttpService = userHttpService;
    this.reloadUserData();
    this.reloadUsersList();
  }

  private reloadUserData(): void {
    this._userHttpService.getUser(this._cookie.get('login')).subscribe(value => {
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

  public openChangePasswordBlock(blockId: string, buttonId: string): void {
    if (document.getElementById(blockId).style.display == 'none') {
      document.getElementById(blockId).style.display = 'block';
      document.getElementById(buttonId).style.display = 'none';
    }
  }

  public changePassword(): void {
    if (this._userHttpService.login(this.mainUser.login, Md5.init(this.oldpass)) && !(this.oldpass === this.newpass) && (this.newpass !== undefined)) {
      console.log('Old password done!');
      this.mainUser.password = Md5.init(this.newpass);
      console.log(this.mainUser.password);
      this._userHttpService.changePassword( this.mainUser.login, this.mainUser.password ).subscribe(value => {
        console.log(value);
      });
    } else {
      this.errorChangePassword = true;
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
    if ((this.start !== undefined) && (this.end !== undefined)) {
      this._userHttpService.messages(this._cookie.get('login'), this.start, this.end).subscribe(value => {
        this.userMessages = value;
      });
    }
  }

  public changeName(): void {
    if (this.newname !== undefined) {
      this._userHttpService.changeName(this._cookie.get('login'), this.newname).subscribe(value => {
        console.log(value);
      });
      console.log(this.newname);
    } else {
      console.log("error name");
    }
  }
}
