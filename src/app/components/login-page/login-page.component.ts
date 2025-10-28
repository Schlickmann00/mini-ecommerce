import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  loading = false;
  errorMsg = '';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
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

    this.http.post<{ token: string }>('/api/auth/login', this.form.value)
      .pipe(takeUntil(this.destroy$), finalize(() => (this.loading = false)))
      .subscribe({
        next: ({ token }) => {
          this.auth.saveToken(token);
          this.router.navigateByUrl('/home');
        },
        error: () => this.errorMsg = 'Falha no login. Verifique suas credenciais.',
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
