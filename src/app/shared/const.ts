import { environment } from 'src/environments/environment';

export const GLOBAL = {
  API_URL: 'http://localhost:3000/api/',
  socketConfig: {
    url: 'http://localhost:3000/',
  },
  // API_URL: environment.API_URL+'/api/',
  // socketConfig: {
  //     url: environment.API_URL
  // }
};
