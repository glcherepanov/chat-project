import { Component, OnInit } from '@angular/core';
import { UserHttpService } from '../../../HttpServices/UserHttpService';
import { Router } from '@angular/router';
import { UserDto } from '../../../dto/user/UserDto';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  providers: [UserHttpService]
})
export class RegistrationComponent {
  public user: UserDto;
  public error: boolean;

  constructor(private _userHttpService: UserHttpService, private _router: Router) {
    this.user = new UserDto();
  }

  public registration(): void {
    const _this = this;
    let registered = false;
    this._userHttpService.add( this.user ).subscribe({
      next(response: boolean) { registered = response; },
      complete() {
        if (registered) {
          _this._router.navigateByUrl('/login');
        } else {
          _this.error = true;
        }
      }
    });
  }
}
