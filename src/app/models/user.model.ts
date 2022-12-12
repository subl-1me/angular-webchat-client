export class User{
    public username: string;
    public email: string;
    public password: string;
    public avatarUrl: string;
    public chats: any;

    constructor(
        username:string, 
        email:string, 
        password:string,
        avatarUrl: string,
    ){
        this.username = username;
        this.email = email;
        this.password = password,
        this.avatarUrl = avatarUrl
    }
}