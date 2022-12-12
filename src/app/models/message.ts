import { User } from '../models/user';
import { Chat } from './chat';

export interface Message{
    _id?: String,
    user: any,
    content: String,
    status?: String,
    chat: String,
    isNotification?: boolean,
    notificationType?: String,
    images?: Image[],
    createdAt?: String,
    updatedAt?: String
}

interface Image{
    public_id: string,
    url: string
}
