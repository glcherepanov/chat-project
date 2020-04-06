import { Component } from '@angular/core';
import { UserHttpService } from '../../../HttpServices/UserHttpService';
import { Router } from '@angular/router';
import { FriendDto } from '../../../dto/friends/FriendDto';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [UserHttpService]
})

export class SearchComponent {
  public resultusers: FriendDto[];

  public SearchComponent() {

  }
}
