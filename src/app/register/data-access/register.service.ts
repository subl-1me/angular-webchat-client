import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from 'src/app/shared/const';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  private readonly API_URL:string = GLOBAL.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  public register(user:User):Observable<any>{
    return this.http.post(this.API_URL + 'user', user, { headers: this.headers });
  }
}
