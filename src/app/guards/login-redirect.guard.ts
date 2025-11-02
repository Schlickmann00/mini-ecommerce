import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Injectable({ providedIn: 'root' })
export class LoginRedirectGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    // Se já logado, não deixa ficar no /login (evita piscar/loop)
    if (this.auth.isLoggedIn()) {
      return this.router.parseUrl('/home');
    }
    return true;
  }
}