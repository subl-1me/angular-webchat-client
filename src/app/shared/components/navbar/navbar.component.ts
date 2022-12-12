import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { AuthService } from '../../services/user/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public userAuth:User = {
    email: '',
    username: ''
  }
  constructor(
    private authService: AuthService
  ) { 
    this.userAuth = this.authService.getUser();
  }

  ngOnInit(): void {
  }

  public logout():void{
    localStorage.clear();

    window.location.reload();
  }

}
