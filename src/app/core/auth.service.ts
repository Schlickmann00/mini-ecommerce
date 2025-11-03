// src/app/core/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, user => {
      this.userSubject.next(user);
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }
}
