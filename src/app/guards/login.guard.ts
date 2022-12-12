import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private _router: Router
  ){}

  canActivate():boolean{
    const userCredentials = localStorage.getItem('userAuth');
    if(!userCredentials){
      this._router.navigate(['/login']);
      return false;
    }

    const userCredentialsParsed = JSON.parse(userCredentials);
    if(!userCredentialsParsed.token){
      this._router.navigate(['/login']);
      return false;
    }

    return true;
  }
  
}
