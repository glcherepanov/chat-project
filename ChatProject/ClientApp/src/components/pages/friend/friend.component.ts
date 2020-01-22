import { Component } from '@angular/core';
import { UserDto } from '../../../dto/user/UserDto';
import { UserHttpService } from '../../../HttpServices/UserHttpService';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-friend',
    templateUrl: './friend.component.html',
    providers: [UserHttpService]
})

export class FriendComponent {
  private readonly _userHttpService: UserHttpService;
  public isFriend: boolean;
  public friend: UserDto = new UserDto();
  public friendLogin: string;

  public constructor(userHttpService: UserHttpService, route: ActivatedRoute, private _cookie: CookieService) {
    this._userHttpService = userHttpService;
    route.params.subscribe(params => {
      this.friendLogin = params['login'];
    });
    this.reloadUser();
  }

  private reloadUser(): void {
    this._userHttpService.getUser( this.friendLogin ).subscribe(value => {
      this.friend = value;
    });
  }

  public remove(id: number): void {
    this._userHttpService.removeUser(id).subscribe(() => {
      this.reloadUser();
    });
  }

  public add( userLogin: string ): void {
    this._userHttpService.addFriend( this._cookie['login'], userLogin ).subscribe(() => {
      this.reloadUser();
    });
  }

  // public write(  )
}
