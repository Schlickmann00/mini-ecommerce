import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../core/auth.service';

@Injectable({ providedIn: 'root' })
export class LoginRedirectGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Se já logado, não deixa ficar no /login (evita piscar/loop)
    return this.auth.getUser().pipe(
      take(1),
      map(user => {
        if (user) {
          return this.router.parseUrl('/home');
        }
        return true;
      })
    );
  }
}
