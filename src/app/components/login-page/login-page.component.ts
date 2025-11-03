// src/app/components/login-page/login-page.component.ts
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil, filter, take } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styles: [`
    .login-container {
      min-height: calc(100vh - 80px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .login-card {
      background: var(--bg-white);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-lg);
      padding: 3rem;
      width: 100%;
      max-width: 400px;
    }

    .login-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
      text-align: center;
    }

    .login-subtitle {
      color: var(--text-secondary);
      text-align: center;
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
      font-weight: 500;
      font-size: 0.875rem;
    }

    .form-input {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid var(--border-color);
      border-radius: var(--border-radius);
      font-size: 1rem;
      transition: var(--transition);
    }

    .form-input:focus {
      border-color: var(--primary-color);
      outline: none;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }

    .form-input.ng-invalid.ng-touched {
      border-color: var(--danger-color);
    }

    .error-message {
      color: var(--danger-color);
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .checkbox-group input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    .checkbox-group label {
      cursor: pointer;
      color: var(--text-secondary);
      font-size: 0.875rem;
    }

    .btn-submit {
      width: 100%;
      background: var(--primary-color);
      color: white;
      padding: 0.875rem;
      border-radius: var(--border-radius);
      font-weight: 600;
      font-size: 1rem;
      transition: var(--transition);
      margin-bottom: 1rem;
    }

    .btn-submit:hover:not(:disabled) {
      background: var(--primary-hover);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }

    .btn-submit:disabled {
      background: var(--text-secondary);
      cursor: not-allowed;
      opacity: 0.6;
    }

    .loading-message {
      text-align: center;
      color: var(--primary-color);
      font-weight: 500;
      margin-top: 1rem;
    }

    .error-alert {
      background: #fee2e2;
      color: #991b1b;
      padding: 1rem;
      border-radius: var(--border-radius);
      margin-bottom: 1rem;
      text-align: center;
      font-weight: 500;
    }

    @media (max-width: 480px) {
      .login-card {
        padding: 2rem 1.5rem;
      }

      .login-title {
        font-size: 1.5rem;
      }
    }
  `],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  loading = false;
  errorMsg = '';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3)]],
      manterLogado: [true],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.errorMsg = '';
    this.loading = true;

    const { email, senha } = this.form.value;

    this.auth.login(email, senha)
      .then(() => {
        // O onAuthStateChanged já atualiza o BehaviorSubject automaticamente
        // Aguardamos um pequeno delay para garantir que o estado foi atualizado
        setTimeout(() => {
          this.router.navigateByUrl('/home').catch(err => {
            console.error('Erro ao navegar:', err);
            this.loading = false;
          });
        }, 200);
      })
      .catch((err) => {
        this.errorMsg = 'Falha no login. Verifique suas credenciais.';
        console.error(err);
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
