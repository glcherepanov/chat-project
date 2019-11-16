import { Component } from '@angular/core';
import { UserDto } from '../../../dto/user/UserDto';
import { UserHttpService } from '../../../HttpServices/UserHttpService';

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
})

export class FriendsComponent {
  private readonly _userHttpService: UserHttpService;
  public users: UserDto[];

  public constructor(userHttpService: UserHttpService) {
    this._userHttpService = userHttpService;
    this.reloadUser();
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
}
