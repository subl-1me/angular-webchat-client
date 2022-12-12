import { Injectable } from '@angular/core';
import { UserCredentials } from '../../models/user-credentials.model';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user:User = {
    username: '',
    email: ''
  }
  private token:string = '';

  constructor() { 
    this.parseUserInfo();
  }

  public saveUserInfo(user:User, token?:string):void{
    delete user.password;
    delete user.chats;

    const userAuth = {
      user: user,
      token: token ? token : this.token
    }
    localStorage.setItem('userAuth', JSON.stringify(userAuth));
    this.user = user;
  }

  private parseUserInfo():void{
    const userInfo = localStorage.getItem('userAuth') || null;
    if(!userInfo) { return; } // user not logged yet

    this.user = JSON.parse(userInfo).user;
    this.token = JSON.parse(userInfo).token;
  }

  public getToken():string{
    return this.token;
  }

  public getUser():User{
    return this.user;
  }

  private saveUser():void{
    localStorage.setItem('userAuth', JSON.stringify(this.user));
  }

  public setUser(user:any){
    this.user.username = user.username;
    if(user.avatar){
      this.user.avatar = user.avatar
    }

    this.saveUser();
  }

  public logOut():void{
    localStorage.clear();
    window.location.reload();
  }

}
