export class UserCredentials{
    constructor(
        public _id:string,
        public username: string,
        public token: string,
        public avatar: any
    ){
        this._id = _id;
        this.username = username;
        this.token = token;
        this.avatar = avatar;
    }
}