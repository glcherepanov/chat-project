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

  public constructor(userHttpService: UserHttpService) {
    this._userHttpService = userHttpService;
    this.reloadUser();
    this.mainUser.name = 'User';
    this.mainUser.login = 'Login';
    this.mainUser.type = UserType.Admin;
  }

  private reloadUser(): void {
    this._userHttpService.getUsers().subscribe(values => {
      this.users = values;
    });
  }

  public deleteUser(id: number): void {
    this._userHttpService.removeUser(id).subscribe(() => {
      this.reloadUser();
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
