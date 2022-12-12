import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  public images: any;

  private validMimes: String[] = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp"
  ]

  constructor() { 
    this.images = [];
  }

  public insertImage(image:any):void{
    // this.images.push(image);
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (result) => {
      this.images.push(result.target?.result);
    }
  }

  public removeImage(image:any):void{
    this.images = this.images.filter((_image:any) => _image !== image);
  }

  public getImages():any{
    return this.images;
  }

  public isImage(fileMime:string):boolean{
    if(this.validMimes.includes(fileMime)) return true;
    
    return false;
  }

  public empty():any{
    this.images = [];
  }

  public createFormData():FormData | null{
    if(this.images.length === 0) return null;
    console.log('creando');
    const data = new FormData();

    this.images.forEach((image:any) => {
      data.append("file", image);
    })
    data.append('upload_preset', 'chat-images');

    return data;
  }

}
