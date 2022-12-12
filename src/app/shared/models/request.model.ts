export interface Request{
    _id:string,
    chatId?: string,
    from: {
        _id:string,
        username:string,
        avatar:Avatar
    },
    to:{
        _id:string,
        username:string
    },
    type:string,
    createdAt?: Date,
    expiredAt: Date
}


interface Avatar{
    public_id: string,
    url: string,
}