import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/service/login.service';
import { environment } from 'src/environments/environment';
import { TokenService } from '../services/token.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private router: Router, private loginService: LoginService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(this.requestWithHeaders(request));
  }

  private requestWithHeaders(req: HttpRequest<unknown>): HttpRequest<unknown> {
    const headerObject: any = {};
    if (req.method === 'POST' && !(req.body instanceof FormData)) {
      headerObject['Content-type'] = 'application/x-www-form-urlencoded';
    }
    if (req.method === 'GET') {
      headerObject['Content-type'] = 'application/json';
    }
    if (req.url.indexOf(environment.apiUrl) !== -1) {
      const isActive = TokenService.isAuthenticated();
      if (isActive) {
        headerObject[
          'Authorization'
        ] = `Bearer ${TokenService.getAccessToken()}`;
      }
    }
    const headers = new HttpHeaders(headerObject);
    console.log('hie');
    return req.clone({ headers });
  }
}
