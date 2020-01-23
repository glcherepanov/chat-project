import { Component } from '@angular/core';
import { UserDto } from '../../../dto/user/UserDto';
import { UserType } from '../../../dto/user/UserType';
import { UserHttpService } from '../../../HttpServices/UserHttpService';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  providers: [UserHttpService, CookieService]
})

export class UserComponent {
  private readonly _userHttpService: UserHttpService;
  public users: UserDto[];
  public mainUser: UserDto = new UserDto ();

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

  public getUserType( type: UserType ): string {
    switch ( type ) {
      case UserType.Admin:
        return 'Админ';
      case UserType.User:
        return 'Пользователь';
      default:
        return 'бан';
    }
  }
}
