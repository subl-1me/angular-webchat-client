import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/services/user/auth.service';
import { ImageService } from 'src/app/chat/utils/image.service';

import { UserService } from 'src/app/shared/services/user/user.service';
import { User } from 'src/app/shared/models/user.model';

import { Properties } from '../models/properties.model';

import { CloudinaryService } from 'src/app/chat/data-access/cloudinary.service';

import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css'],
  providers: [ 
    AuthService, 
    ImageService, 
    UserService, 
    CloudinaryService
  ]
})
export class SettingsPageComponent implements OnInit {
  // Icons
  faSave = faSave;
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  faChevronLeft = faChevronLeft;

  public userAuth:User = {
    email: '',
    username: ''
  }
  public username:string;
  public serviceMessage:string;
  public imageAsDataUrl:string = '';

  public updaterResponse:string =  '';
  public onLoading:boolean = false;

  constructor(
    private authService: AuthService,
    private imageService: ImageService,
    private userService: UserService,
    private cloudinaryService: CloudinaryService
  ) {
    this.userAuth = this.authService.getUser();
    this.username = this.userAuth.username;
    this.serviceMessage = '';
   }

  ngOnInit(): void {
  }

  public onSubmit():void{
    if(this.username === this.userAuth.username && this.imageAsDataUrl === '') return;
    this.onLoading = true;

    if(this.imageAsDataUrl !== ''){ // there is a image loaded
      let formData = this.imageService.createFormData();
      this.cloudinaryService.uploadImages(formData).subscribe((response) => {
        if(response.error || response.status === 'error') return;

        let properties = this.setUpdateProperties(response.images[0]);
        this.updateUser(properties);
        this.updaterResponse = 'success';
        this.onLoading = false;

      })

      return;
    }

    // Just update
    let properties = this.setUpdateProperties();
    this.updateUser(properties);
  }

  private updateUser(properties:any):void{
    if(!this.userAuth._id) { return; }
    this.userService.update(properties, this.userAuth._id).subscribe((response) => {
      this.onLoading = false;
      if(response.error || response.status === 'error'){
        this.updaterResponse = response.message;
        return;
      }

      this.authService.saveUserInfo(response.updatedUser);
      this.updaterResponse = 'success';
      window.location.reload();
    })
  }
  
  private setUpdateProperties(avatar?:any):any{
    let properties:Properties = {};

    if(avatar){
      properties.avatar = {
        value: avatar,
        action: 'edit'
      }
    }

    if(this.hasNameChanged()){
      properties.username = {
        value: this.username,
        action: 'edit'
      }
    }

    return properties;
  }

  private hasNameChanged():boolean{
    if(this.username !== this.userAuth.username) { return true }

    return false;
  }

  public handleFile(event:any):void{
    
    const file = <File>event.target.files[0];
    this.imageService.clear();
    const handlerResponse = this.imageService.handleImage(file);

    if(handlerResponse instanceof String){
      this.serviceMessage = <string>handlerResponse;
      return;
    }

    this.imageAsDataUrl = handlerResponse;
    this.serviceMessage = '';
    
    // element.attributes[3].value = this.userAvatar[0];
    // this.imageService.clear();
    // this.userInfo = this.authService.getUserCredentials();

  }

  public removeAccount():void{
    if(!this.userAuth._id) { return; }
    this.userService.removeAccount(this.userAuth._id).subscribe((response) => {
      // TODO: add feedback
      if(response.error || response.status === 'error') { return; } // Pending add feeback

      this.authService.logOut();
    })
  }

}
