import { environment } from "src/environments/environment"

export const GLOBAL = {

    // API_URL: 'https://realtime-chat-api-rest.herokuapp.com/api/',
    // socketConfig: {
    //     url: 'https://realtime-chat-api-rest.herokuapp.com/'
    // }
    API_URL: environment.API_URL+'/api/',
    socketConfig: {
        url: environment.API_URL
    }
}