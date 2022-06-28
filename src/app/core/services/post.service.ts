import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable, Observer } from 'rxjs';

import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root',
})
export class PostService {

  constructor(private apiService: ApiService) {}

  getPosts() {
    const url =
      `wp/v2/posts?_embed&status=publish&author=3&per_page=3` +
      '&any=' +
      Math.random();
    return this.apiService.get(url);
  }
  searchInPosts(query: string = ''): Observable<any> {
    return this.apiService.get(`wp/v2/search/${query}&_embed`);
  }
  savePost(formData: FormData, id = ''): Observable<any> {
    const url = `wp/v2/posts/` + id;
    return this.apiService.post(url, ApiService.CreateFormData(formData));
  }

  getSinglePostById(id: any) {
    const url = `wp/v2/posts/${id}?_embed&?any=${Math.random()}`;

    return this.apiService.get(url);
  }
  delete(id: number): Observable<any> {
    const url = `wp/v2/posts/${id}`;
    return this.apiService.delete(url);
  }
  // create(formData:any): Observable<any> {
  //   const url = `wp/v2/posts`;
  //   return this.apiService.post(url, ApiService.CreateFormData(formData));
  // }
  // edit(id:number,formData: any): Observable<any>{
  //   const url = `wp/v2/posts/${id}`;
  //   return this.apiService.put(url, ApiService.CreateFormData(formData));
  // }
}
