import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded: boolean;
  public userLogin: string;
  public logged: boolean;

  constructor(private cookieService: CookieService, private router: Router, private activatedRouter: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.getUserLogin();

    this.router.events
      .subscribe( e => {
        this.getUserLogin();
      } );
  }

  public LogOut(): void {
    this.cookieService.delete('login');
    this.router.navigateByUrl('/');
    this.logged = false;
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  private getUserLogin(): void {
    this.userLogin = this.cookieService.get('login');
    this.logged = this.userLogin === '' ? false : true;
  }
}
