import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public formData:FormData = new FormData();
  public loadedImages:any = [];
  private imagesAux:any = [];
  
  private validMimes: String[] = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp"
  ]

  constructor() {
    // Cloudinary preset
    this.formData.append('upload_preset', 'chat-images');
   }

  public handleImage(file:File):any{
    // Check if file is image
    if(!this.validMimes.includes(file.type)) return 'Please, select a valid image.';

    this.imagesAux.push(file);
    // this.formData.append('file', file);
    let readerResult = this.readImage(file)
      .then((promise) => {
        this.loadedImages.push(promise);
        return promise;
      })
      .catch((_err) => {
        console.log('Something was wrong trying to read image.')
      })
      
    return this.loadedImages;
    // return this.loadedImages;
  }

  public getImages():any{
    return this.loadedImages;
  }

  /**
   * Clear array of loaded images and return empty array;
   * @returns Images empty array
   */
  public clear():any{
    this.formData.delete('file');
    this.formData.delete('messageId');
    this.imagesAux = [];
    this.loadedImages = [];
    return this.loadedImages;
  }

  public createFormData():FormData{
    this.imagesAux.forEach((image:any) => {
      this.formData.append('file', image);
    })

    return this.formData;
  }

  public remove(image:any):any{
    let arrayLoadedIndex = this.loadedImages.indexOf(image);
    let removedFileName = this.imagesAux[arrayLoadedIndex].name;
    this.imagesAux = this.imagesAux.filter((image:any) => image.name !== removedFileName);

    this.loadedImages = this.loadedImages.filter((_image:any) => _image !== image);
    return this.loadedImages;
  }

  private async readImage(file:File):Promise<any>{

    const readerImg = () => {
      const reader = new FileReader();
      return new Promise(resolve => {
        reader.onload = (event) => {
          resolve(event.target?.result);
        }

        reader.readAsDataURL(file);
      })
    }
    
    const fileAsDataUrl = await readerImg();
    return fileAsDataUrl;
  }
}
