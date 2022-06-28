import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private apiService: ApiService) { }

  getImageById(id: string): Observable<any> {
    const url = `wp/v2/media/` + id + '?any=' + Math.random();
    return this.apiService.get(url);
  }


  uploadImage(photodata: any): Observable<any> {
    let formdata = new FormData();
    console.log('', photodata);
    formdata.append('file', photodata.file);
    const url = `wp/v2/media`;
    return this.apiService.post(url, formdata);
  }
}
