import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Icons
import { faMessage } from '@fortawesome/free-solid-svg-icons';

import { User } from 'src/app/shared/models/user.model';
import { RegisterService } from '../data-access/register.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit{

  public serviceErrorMessage: string;
  public isFormLoading: boolean;

  public registerForm:FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  })

  // Icons
  faMessage = faMessage;

  public user:User = { username: '', password: '', email: '' };

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {
    this.serviceErrorMessage = '';
    this.isFormLoading = false;
  }

  ngOnInit(): void {
  }

  public register():void{
    this.serviceErrorMessage = '';
    if(this.formHasErrors()) return;

    this.user = this.registerForm.value;
    this.isFormLoading = true;

    this.registerService.register(this.user).subscribe((response) => {
      this.isFormLoading = false;
      if(response.errorCode || response.status === 'error'){
        this.serviceErrorMessage = response.message;
        return;
      }

      this.router.navigate(['/login']);
    })
  }

  private formHasErrors():any{
    if(this.registerForm.invalid){
      this.serviceErrorMessage = 'All fields are required.';
      return true;
    }

    if(this.registerForm.controls['password'].value !== this.registerForm.controls['confirmPassword'].value){
      this.serviceErrorMessage = 'Password does not match';
      return true;
    }

    return false;
  }

}
