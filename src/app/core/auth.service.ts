import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth, private router: Router) {} // injeta aqui

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth).then(() => this.router.navigate(['/login']));
  }

  getUser(): Observable<User | null> {
    return new Observable(subscriber => {
      const unsubscribe = onAuthStateChanged(this.auth, user => subscriber.next(user));
      return { unsubscribe };
    });
  }
}
