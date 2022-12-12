import { Chat } from './chat.model';

export interface User {
    _id?: string,
    username: string,
    email: string,
    chats?: Chat[],
    password?: string,
    createdAt?: Date,
    updatedAt?: Date,
    avatar?:any
}