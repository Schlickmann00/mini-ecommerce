import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // necessário para *ngIf
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [CommonModule] // <- adiciona CommonModule para *ngIf
})
export class HeaderComponent {

  constructor(
    public auth: AuthService, // precisa ser público para o template acessar
    private router: Router
  ) {}

  logout() {
    this.auth.logout();          // método do AuthService
    this.router.navigate(['/']); // redireciona para a home
  }
}
