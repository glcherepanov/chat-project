import { ChatType } from './ChatType';

export class ChatDto {
    public id: number;
    public type: ChatType;
    public name: string;
    public imgPath: string;
}
