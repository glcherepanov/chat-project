import { ChatType } from './ChatType';

export class ChatDto {
    public chatId: number;
    public typeChat: ChatType;
    public name: string;
    public imgPath: string;
}
