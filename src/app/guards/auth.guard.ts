import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router
  ){}

  canActivate():boolean{

    const token = localStorage.getItem('token');
    if(token){ // Case if user is alredy authenticated
      this._router.navigate(['']);

      return false;
    }

    return true;
  }
  
}
