import { environment } from './../../environments/environment';

export const global = {
  API_URL: 'http://localhost:3000/api/',
  socketConfig: {
    url: 'http://localhost:3000', //test
  },
  //   API_URL: environment.API_URL + '/api/',
  //   socketConfig: {
  //     url: environment.API_URL,
  //   },
};
