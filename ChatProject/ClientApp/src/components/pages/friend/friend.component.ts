import { Component } from '@angular/core';
import { UserDto } from '../../../dto/user/UserDto';
import { UserHttpService } from '../../../HttpServices/UserHttpService';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-friend',
    templateUrl: './friend.component.html',
    providers: [UserHttpService]
})

export class FriendComponent {
  private readonly _userHttpService: UserHttpService;
  public friend: UserDto = new UserDto();
  public friendLogin: string;

  public constructor(userHttpService: UserHttpService, route: ActivatedRoute) {
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

  public deleteUser(id: number): void {
    this._userHttpService.removeUser(id).subscribe(() => {
      this.reloadUser();
    });
  }
}
