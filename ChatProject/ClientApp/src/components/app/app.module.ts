import { ChatListComponent } from './../pages/ChatList/ChatList.component';
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
import { HttpService } from '../../HttpServices/HttpService';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    UserComponent,
    FriendsComponent,
    ChatListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'user', component: UserComponent, pathMatch: 'full' },
      { path: 'friends', component: FriendsComponent},
      { path: 'chat-list', component: ChatListComponent}
    ])
  ],
  providers: [CookieService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
