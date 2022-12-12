import { User } from 'src/app/models/user.model';

/**
 * Create instance of message object to handle chat messages o notifications
 */
export class Message{
    // public user: User|string;
    // public content: string;
    // public chat: string;
    // public isNotification: boolean;
    // public notificationType: string|null;
    // public images?: Image[];
    
    constructor(
        public user:User|string, 
        public content:string, 
        public chat:string, 
        public isNotification?:boolean,
        public notificationType?:string|null,
        public images?:Image[]
    ){
        // this.content = content;
        // this.chat = chat;
        // this.isNotification = isNotification || false;
        // this.notificationType = notificationType || null;
        // this.images = images || [];
    }
}

interface Image{
    public_id: string,
    url: string
}
