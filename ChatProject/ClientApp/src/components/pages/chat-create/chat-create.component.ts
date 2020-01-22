import { Component } from '@angular/core';
import { ChatDto } from './../../../dto/chat/ChatDto';
import { ChatHttpService } from './../../../HttpServices/ChatHttpService';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-chat-create',
  templateUrl: './chat-create.component.html',
  providers: [ChatHttpService]
})

export class ChatCreateComponent {

}
