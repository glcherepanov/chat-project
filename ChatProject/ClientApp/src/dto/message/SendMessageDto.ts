import { MessageDto } from './MessageDto';

export class SendMessageDto {
  public userLogin: string;
  public chatId: number;
  public date: Date;
  public text: string;
}
