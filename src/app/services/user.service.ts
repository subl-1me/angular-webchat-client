import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';

// Global vars
import { global } from './const';

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  public register(user: User): Observable<any> {
    return this._http.post(global.API_URL + 'user', user, { headers: headers });
  }

  public authenticate(user: User): Observable<any> {
    return this._http.post(global.API_URL + 'user/authenticate', user, {
      headers: headers,
    });
  }

  public getUser(query: string, filter?:any): Observable<any> {
    return this._http.get(global.API_URL + 'user', { headers: headers, params: { query: query, filter: filter }});
  }

  public getUsers(friendData:string):Observable<any>{
    return this._http.get(global.API_URL+'user/search-friend', { headers: headers, params: { friendData: friendData }});
  }
}
