import { Component } from '@angular/core';
import { UserDto } from '../../../dto/user/UserDto';
import { UserType } from '../../../dto/user/UserType';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent {
  user: UserDto = {
    userId: 1,
    name: '',
    login: '',
    password: '',
    type: UserType.User
  };
}
