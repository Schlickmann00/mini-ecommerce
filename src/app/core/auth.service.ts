import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const TOKEN_KEY = 'app_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);

  constructor() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      this.userSubject.next({ name: 'Usuário' }); // Opcional: decodificar token real
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    this.userSubject.next({ name: 'Usuário' });
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.userSubject.next(null);
  }

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }
}
