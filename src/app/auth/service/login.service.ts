import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/core/services/api.service';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private apiService: ApiService) { }

  validateUser(formData: any): Observable<any> {
    const url = `jwt-auth/v1/token`;
    return this.apiService.post(url, ApiService.CreateFormData(formData));
  }
}
