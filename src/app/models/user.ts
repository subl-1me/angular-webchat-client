import { Chat } from '../models/chat';
import { Request } from './request';

export interface User {
    _id?: String,
    username: String,
    email?: String,
    chats?: Chat[],
    password?: String,
    createdAt?: Date,
    updatedAt?: Date,
    activeRequest?: Request
}