import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpUrlEncodingCodec,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  static CreateFormData(params: any): HttpParams {
    let httpParams = new HttpParams({ encoder: new HttpUrlEncodingCodec() });

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        if (params[key] instanceof Array) {
          const newArray = params[key];
          for (let i = 0; i < newArray.length; i++) {
            if (typeof newArray[i] === 'object') {
              objectParse(newArray[i], key + '[' + i + ']');
            }
            if (typeof newArray[i] !== 'object') {
              httpParams = httpParams.set(key + '[' + i + ']', newArray[i]);
            }
          }
        } else if (typeof params[key] === 'object') {
          objectParse(params[key], key);
        } else {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }

    function objectParse(param: any, firstkey: any) {
      for (const key in param) {
        if (param.hasOwnProperty(key)) {
          if (typeof param[key] === 'object') {
            const newObject = param[key];
            for (const newKey in newObject) {
              if (newObject.hasOwnProperty(newKey)) {
                httpParams = httpParams.set(
                  firstkey + '[' + key + ']' + '[' + newKey + ']',
                  newObject[newKey]
                );
              }
            }
          } else {
            httpParams = httpParams.set(firstkey + '[' + key + ']', param[key]);
          }
        }
      }
    }
    return httpParams;
  }

  get(url: string): Observable<any> {
    return this._http
      .get(`${environment.apiUrl}${url}`)
      .pipe(catchError(this._handlerError()));
  }

  post(url: string, params: object) {
    return this._http
      .post(`${environment.apiUrl}${url}`, params)
      .pipe(catchError(this._handlerError()));
  }

  put(url: string, params: object) {
    return this._http
      .put(`${environment.apiUrl}${url}`, params)
      .pipe(catchError(this._handlerError()));
  }

  delete(url: string) {
    return this._http
      .delete(`${environment.apiUrl}${url}`)
      .pipe(catchError(this._handlerError()));
  }

  private _handlerError() {
    return (error: HttpErrorResponse): Observable<any> => {
      return throwError(error);
    };
  }
}
