import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GLOBAL } from 'src/app/shared/const';
import { Observable } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private headers:HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  private readonly API_URI:string = GLOBAL.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Authenticate user to server
   * @param user 
   * @returns Token
   */
  public login(user:User):Observable<any>{
    return this.http.post(this.API_URI+'user/authenticate', user, { headers: this.headers })
  }
}
