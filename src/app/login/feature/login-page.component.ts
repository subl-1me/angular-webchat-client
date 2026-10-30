import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

import { faMessage } from '@fortawesome/free-solid-svg-icons';

import { User } from 'src/app/shared/models/user.model';
import { LoginService } from '../data-access/login.service';

import { AuthService } from 'src/app/shared/services/user/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import Tester from 'src/app/models/tester';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [AuthService, LoginService, UserService],
})
export class LoginPageComponent implements OnInit {
  public user: User = { username: '', password: '', email: '' };
  public isFormLoading: boolean;
  public serviceErrorMessage: string;

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public testers: Tester[] = [];

  // Icons
  faMessage = faMessage;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
  ) {
    this.isFormLoading = false;
    this.serviceErrorMessage = '';
  }

  ngOnInit(): void {
    this.getTesterList();
  }

  public login(): void {
    this.user = this.loginForm.value;

    if (this.formHasErrors()) return;

    this.isFormLoading = true;
    this.loginService.login(this.user).subscribe((response) => {
      this.isFormLoading = false;
      if (response.errorCode || response.status === 'error') {
        this.serviceErrorMessage = response.message;
        return;
      }

      let user = response.payload;
      this.authService.saveUserInfo(user, response.token);
      this.setAuthCredentials(response.payload, response.token); //
      this.router.navigate(['/home']);
    });
  }

  private setAuthCredentials(user: User, token: string): void {
    let user_auth = {
      username: user.username,
      _id: user._id,
      token: token,
      avatar: 'default',
    };
    if (user.avatar) user_auth.avatar = user.avatar;
    localStorage.setItem('user_auth', JSON.stringify(user_auth));
  }

  public trackByTesterId(_: number, tester: any) {
    return tester._id ?? tester.id;
  }

  private formHasErrors(): any {
    if (this.loginForm.invalid) {
      this.serviceErrorMessage = 'All fields are required.';
      return true;
    }

    return false;
  }

  public async getTesterList(): Promise<void> {
    const request = await lastValueFrom(this.userService.getTestersList());
    if (!request.success) {
      alert('DEV LOG: Error fetching testes users.');
      return;
    }
    this.testers = request.users;
  }
}
