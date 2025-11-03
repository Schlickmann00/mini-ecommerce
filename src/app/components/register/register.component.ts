import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  styles: [`
    .container { min-height: calc(100vh - 80px); display: flex; align-items: center; justify-content: center; padding: 2rem; background: var(--bg-light); }
    .card { background: var(--bg-white); border-radius: var(--border-radius); box-shadow: var(--shadow-lg); padding: 2rem; width: 100%; max-width: 440px; }
    .title { font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem; text-align: center; }
    .subtitle { color: var(--text-secondary); text-align: center; margin-bottom: 1.5rem; }
    .group { margin-bottom: 1rem; }
    .label { display: block; margin-bottom: 0.5rem; color: var(--text-primary); font-weight: 500; font-size: 0.875rem; }
    .input { width: 100%; padding: 0.75rem; border: 2px solid var(--border-color); border-radius: var(--border-radius); font-size: 1rem; }
    .input:focus { border-color: var(--primary-color); outline: none; box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.1); }
    .error { color: var(--danger-color); font-size: 0.875rem; margin-top: 0.25rem; }
    .btn { width: 100%; background: var(--primary-color); color: white; padding: 0.875rem; border-radius: var(--border-radius); font-weight: 600; margin-top: 0.5rem; }
    .btn:disabled { background: var(--text-secondary); cursor: not-allowed; opacity: .7; }
    .link { display: block; text-align: center; margin-top: 1rem; color: var(--primary-color); }
  `],
  template: `
    <div class="container">
      <div class="card">
        <h1 class="title">Criar conta</h1>
        <p class="subtitle">Cadastre-se para continuar</p>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="group">
            <label class="label">Nome</label>
            <input class="input" type="text" formControlName="nome" placeholder="Seu nome" />
            <div class="error" *ngIf="form.get('nome')?.invalid && form.get('nome')?.touched">Informe seu nome</div>
          </div>
          <div class="group">
            <label class="label">Email</label>
            <input class="input" type="email" formControlName="email" placeholder="seu@email.com" />
            <div class="error" *ngIf="form.get('email')?.invalid && form.get('email')?.touched">Email inválido</div>
          </div>
          <div class="group">
            <label class="label">Senha</label>
            <input class="input" type="password" formControlName="senha" placeholder="••••••••" />
            <div class="error" *ngIf="form.get('senha')?.invalid && form.get('senha')?.touched">Mínimo 6 caracteres</div>
          </div>

          <button class="btn" type="submit" [disabled]="form.invalid || loading">{{ loading ? 'Cadastrando...' : 'Cadastrar' }}</button>
        </form>

        <a class="link" routerLink="/login">Já possui conta? Entrar</a>
      </div>
    </div>
  `
})
export class RegisterComponent {
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    const { nome, email, senha } = this.form.value;
    this.auth.register(email, senha, nome)
      .then(() => this.router.navigate(['/home']))
      .catch(err => { console.error(err); alert('Erro ao cadastrar'); this.loading = false; });
  }
}


