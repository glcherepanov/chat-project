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
  private readonly _service: UserHttpService;
  public resultusers: FriendDto[];
  public login: string;

  public constructor( service: UserHttpService ) {
    this._service = service;
  }

  public getUsers(): void {
    this._service.getUsersByLogin( this.login ).subscribe( value => {
      this.resultusers = value;
    });
  }
}
