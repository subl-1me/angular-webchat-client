import { User } from './user.model';
import { Message } from './message.model';

export interface Chat {
    _id: string,
    participants: User[],
    messages: Array<Message>,
    counter?: number,
    isGroup?: boolean;
    expireAt?: Date,
    createdAt?: Date,
    updatedAt?: Date
}