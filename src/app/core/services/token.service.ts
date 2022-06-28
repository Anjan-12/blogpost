import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() { }

  static isAuthenticated(): boolean {
    const access_token = TokenService.getAccessToken();
    return access_token !== '';
  }

  static setAccessToken(accessToken: string): void {
    localStorage.setItem('access_token', accessToken);
  }

  static getAccessToken(): string {
    return localStorage.getItem('access_token') || '';
  }
}
