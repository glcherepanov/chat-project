import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public userLogin: string;
  public logged: boolean;

  constructor(private cookieService: CookieService) {
  }

  public ngOnInit(): void {
    this.userLogin = this.cookieService.get('user-login');
    this.logged = this.userLogin == null;
  }
}
