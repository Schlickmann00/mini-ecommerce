import { Injectable } from '@angular/core';

const TOKEN_KEY = 'app_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }
  saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
}
