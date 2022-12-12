import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';

export interface Chat {
    _id: string,
    participants: User[],
    messages: Array<Message>,
    counter?: number,
    isGroup?: boolean;
    expireAt: Date,
    createdAt?: Date,
    updatedAt?: Date
}