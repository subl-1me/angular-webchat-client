export interface Properties{
    avatar?: DataFormat,
    username?: DataFormat,
    chat?: DataFormat,
}

interface Avatar{
    public_id: string,
    url: string,
}

interface DataFormat{
    value:any|Avatar,
    action: string // would be add/remove/edit
}
