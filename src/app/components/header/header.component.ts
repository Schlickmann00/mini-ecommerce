import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink], // necessário para ngIf e async
  template: `
    <header>
      <nav>
        <!-- Links de navegação -->
        <a routerLink="/home">Home</a>
        <!-- Ajuste caso não tenha carrinho -->
        <!-- <a routerLink="/carrinho">Carrinho</a> -->

        <!-- Botão de logout mostrado apenas se houver usuário logado -->
        <button *ngIf="auth.getUser() | async" (click)="logout()">Sair</button>
      </nav>
    </header>
  `
})
export class HeaderComponent {
  constructor(public auth: AuthService, private router: Router) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}