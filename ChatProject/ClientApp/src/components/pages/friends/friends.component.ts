import { Component } from '@angular/core';
import { UserDto } from '../../../dto/user/UserDto';
import { UserHttpService } from '../../../HttpServices/UserHttpService';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.scss'],
    providers: [UserHttpService]
})

export class FriendsComponent {
  private readonly _userHttpService: UserHttpService;
  public users: UserDto[];

  public constructor(userHttpService: UserHttpService, private _cookie: CookieService) {
    this._userHttpService = userHttpService;
    this.reloadUser();
  }

  private reloadUser(): void {
    this._userHttpService.getFriends( this._cookie.get('login') ).subscribe(values => {
      this.users = values;
    });
  }

  public deleteUser(id: number): void {
    this._userHttpService.removeUser(id).subscribe(() => {
      this.reloadUser();
    });
  }
}
