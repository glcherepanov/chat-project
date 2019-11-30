import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserHttpService } from '../../../HttpServices/UserHttpService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [UserHttpService]
})
export class LoginComponent {
  public login: string;
  public password: string;
  public error: boolean;

  constructor(private _cookieService: CookieService, private _userHttpService: UserHttpService, private _router: Router) {
  }

  public Auth(): void {
    const _this = this;
    let logged = false;
    this._userHttpService.login( this.login, this.password ).subscribe({
      next(response: boolean) { logged = response; },
      complete() {
        if ( logged ) {
          _this._cookieService.set('login', _this.login);
          _this._router.navigateByUrl('/');
        } else {
          _this.error = true;
        }
       }
     });
  }
}
