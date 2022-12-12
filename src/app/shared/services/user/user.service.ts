import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from '../../const';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headers:HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  private readonly API_URL:string = GLOBAL.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  public searchUser(username:string):Observable<any>{
    return this.http.get(this.API_URL+'user/search', { headers: this.headers, params: { username: username }})
  }

  public update(properties:any, userId:string):Observable<any>{
    return this.http.put(this.API_URL+'user', 
    properties, { headers: this.headers, params: { userId: userId }});
  }

  public removeAccount(userId:string):Observable<any>{
    return this.http.delete(this.API_URL+'user',
    { headers: this.headers, params: { userId: userId }})
  }
}
