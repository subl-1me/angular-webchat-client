import { User } from '../models/user';
import { Message } from '../models/message';

export interface Chat {
    _id: string,
    participants: User[],
    messages: Array<Message>,
    isGroup?:boolean,
    createdAt?: Date,
    updatedAt?: Date
}