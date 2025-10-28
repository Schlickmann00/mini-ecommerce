import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; 
import { LoginRedirectGuard } from './guards/login-redirect.guard';
import { LoginPageComponent } from './components/login-page/login-page.component'; 

const routes: Routes = [
  // Nunca proteja /login com AuthGuard
  { path: 'login', component: LoginPageComponent, canActivate: [LoginRedirectGuard] },

  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home-page.component').then(m => m.HomePageComponent),
      },
      {
        path: 'carrinho',
        loadComponent: () =>
          import('./features/cart/cart-page.component').then(m => m.CartPageComponent),
      },
      { path: '', pathMatch: 'full', redirectTo: 'home' },
    ],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
