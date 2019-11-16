import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded: boolean;
  public userLogin: string;

  constructor(private cookieService: CookieService) {
  }

  public ngOnInit(): void {
    this.cookieService.set('user-login', 'userLogin');
    const login: string = this.cookieService.get('user-login');
    this.userLogin =  login == null ? 'login' : login;
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
