import { MessageDto } from "./MessageDto";

export class SendMessageDto {
  public sendUserId: number;
  public sendChatId: number;
  public message: MessageDto;
}
