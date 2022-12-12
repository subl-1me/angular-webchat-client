import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../const';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  constructor(
    private _http: HttpClient
  ) { }

  public uploadImages(file:FormData | null, newMessageId:string):Observable<any>{
    file?.append('newMessageId', newMessageId);
    return this._http.post(global.API_URL+'cloudinary', file)
  }
}
