import { environment } from 'src/environments/environment';

export const GLOBAL = {
  API_URL: 'http://localhost:3000/api/',
  socketConfig: {
    url: 'http://localhost:3000/',
  },
  CHAT_SCROLL_DOWN_EVENT_CASES: {
    SEND_MESSAGE_EVENT: 'SEND_MESSAGE',
    OPEN_CHAT_EVENT: 'OPEN_CHAT',
  },
  // API_URL: environment.API_URL+'/api/',
  // socketConfig: {
  //     url: environment.API_URL
  // }
};
