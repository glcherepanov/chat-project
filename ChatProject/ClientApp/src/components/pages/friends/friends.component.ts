
import { FriendDto } from '../../../dto/friends/FriendDto';
import { Component } from '@angular/core';

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
  })

export class FriendsComponent {
  friend: FriendDto = {
      name: 'Max',
      login: 'Max100500'
  };
}