import { Chat } from "./chat.model"

export interface Message{
    _id?: string,
    user: any,
    content: string,
    status?: string,
    chat: Chat | string,
    isNotification?: boolean,
    notificationType?: string,
    images?: Image[],
    createdAt?: string|Date,
    updatedAt?: string|Date
}

interface Image{
    public_id: string,
    url: string
}
