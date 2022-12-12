import { environment } from './../../environments/environment';

export const global = {

    // API_URL: 'https://realtime-chat-api-rest.herokuapp.com/api/',
    // socketConfig: {
    //     url: 'https://realtime-chat-api-rest.herokuapp.com/'
    // }
    API_URL: environment.API_URL+'/api/',
    socketConfig: {
        url: environment.API_URL
    }
}