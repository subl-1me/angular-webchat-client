import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { GLOBAL } from 'src/app/shared/const';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  private headers:HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  private readonly API_URL:string = GLOBAL.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  public uploadImages(data:FormData):Observable<any>{
    return this.http.post(this.API_URL+'cloudinary', data);
  }

  public deleteImages(images:[]):Observable<any>{
    return this.http.delete(this.API_URL+'cloudinary',
     { headers: this.headers, body: images })
  }

}
