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
import { FriendComponent } from '../pages/friend/friend.component';
import { HttpService } from '../../HttpServices/HttpService';
import { LoginComponent } from '../pages/login/login.component';
import { RegistrationComponent } from '../pages/registration/registration.component';
import { ChatPageComponent } from '../pages/ChatPage/ChatPage.component';
import { ChatCreateComponent } from '../pages/chat-create/chat-create.component'

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    FriendsComponent,
    FriendComponent,
    ChatListComponent,
    ChatPageComponent,
    ChatCreateComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'user', component: UserComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: 'chat-list', component: ChatListComponent },
      { path: 'chat-list/create', component: ChatCreateComponent },
      { path: 'chat-list/create/:Login', component: ChatCreateComponent },
      { path: 'chat-list/:id', component: ChatPageComponent },
      { path: 'friends', component: FriendsComponent },
      { path: 'friend/:login', component: FriendComponent }
    ])
  ],
  providers: [CookieService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
