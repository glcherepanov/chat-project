import { MessageDto } from "./MessageDto";

export class SendMessageDto {
  public sendUserLogin: string;
  public sendChatId: number;
  public message: MessageDto;
}
