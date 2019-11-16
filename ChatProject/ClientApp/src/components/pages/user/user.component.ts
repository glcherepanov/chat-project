import { Component } from '@angular/core';
import { UserDto } from '../../../dto/user/UserDto';
import { UserType } from '../../../dto/user/UserType';
import { UserHttpService } from '../../../HttpServices/UserHttpService';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  providers: [UserHttpService]
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
}
