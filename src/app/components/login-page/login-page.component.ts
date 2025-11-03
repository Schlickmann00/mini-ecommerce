// src/app/components/login-page/login-page.component.ts
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
      .then(() => this.router.navigateByUrl('/home'))
      .catch((err) => {
        this.errorMsg = 'Falha no login. Verifique suas credenciais.';
        console.error(err);
      })
      .finally(() => (this.loading = false));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
