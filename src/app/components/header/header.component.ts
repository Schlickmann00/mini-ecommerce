import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { CartService } from '../../core/cart.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styles: [`
    header {
      background: var(--bg-white);
      box-shadow: var(--shadow-md);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    nav {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
    }

    .logo img {
      height: 40px;
      width: 40px;
      object-fit: contain;
      border-radius: 6px;
      background: transparent;
    }

    .logo-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--primary-color);
      line-height: 1;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    .nav-link {
      color: var(--text-primary);
      font-weight: 500;
      transition: var(--transition);
      padding: 0.5rem 1rem;
      border-radius: var(--border-radius);
    }

    .nav-link:hover {
      background: var(--bg-light);
      color: var(--primary-color);
    }

    .cart-icon {
      position: relative;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: var(--border-radius);
      transition: var(--transition);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .cart-icon:hover {
      background: var(--bg-light);
    }

    .cart-badge {
      background: var(--danger-color);
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 600;
      position: absolute;
      top: -5px;
      right: -5px;
    }

    .btn-logout {
      background: var(--primary-color);
      color: white;
      padding: 0.5rem 1.5rem;
      border-radius: var(--border-radius);
      font-weight: 500;
      transition: var(--transition);
    }

    .btn-logout:hover {
      background: var(--primary-hover);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }
  `],
  template: `
    <header>
      <nav>
        <div class="logo" routerLink="/home">
          <img [src]="logoSrc" (error)="onLogoError($event)" alt="Gustavo Store" />
          <span class="logo-title">Gustavo Store</span>
        </div>
        
        <div class="nav-links">
          <a routerLink="/home" class="nav-link">Home</a>
          
          <div class="cart-icon" routerLink="/cart" *ngIf="auth.getUser() | async">
            🛒
            <span class="cart-badge" *ngIf="cartCount > 0">{{ cartCount }}</span>
          </div>
          
          <button 
            *ngIf="auth.getUser() | async" 
            (click)="logout()"
            class="btn-logout">
            Sair
          </button>
        </div>
      </nav>
    </header>
  `
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  cartCount = 0;
  logoSrc = 'assets/logo.png';

  constructor(
    public auth: AuthService, 
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.cart$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.cartCount = items.length;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  onLogoError(evt: Event) {
    const img = evt.target as HTMLImageElement;
    if (this.logoSrc === 'assets/logo.png') {
      this.logoSrc = 'assets/logo.jpg';
    } else if (this.logoSrc === 'assets/logo.jpg') {
      this.logoSrc = 'assets/logo.svg';
    } else {
      // Fallback: remove imagem e mantém apenas o título
      img.style.display = 'none';
    }
  }
}
