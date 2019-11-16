import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from '../pages/nav-menu/nav-menu.component';
import { UserComponent } from '../pages/user/user.component';
import { CookieService } from 'ngx-cookie-service';
import { FriendsComponent } from '../pages/friends/friends.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    UserComponent,
    FriendsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: UserComponent, pathMatch: 'full' },
      { path: 'friends', component: FriendsComponent}
    ])
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
