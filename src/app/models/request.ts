
export interface Request{
    _id: string,
    from: {
        _id: string,
        username: string,
    }
    to:{
        _id: string,
        username: string
    }
    status: string,
    type: string,
    chatId?: string
}