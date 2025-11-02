// src/main.ts
import 'zone.js'; // ⚠️ Essencial para Angular
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app/app.component';

import { environment } from './app/environment/environment'; 
import { AuthGuard } from './app/guards/auth.guard';
import { LoginRedirectGuard } from './app/guards/login-redirect.guard';
import { LoginPageComponent } from './app/components/login-page/login-page.component';
import { HomePageComponent } from './app/pages/home.page';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [LoginRedirectGuard] },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomePageComponent },
      { path: '', pathMatch: 'full', redirectTo: 'home' },
    ],
  },
  { path: '**', redirectTo: '' },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(FormsModule, ReactiveFormsModule),

    // 🔹 Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())
  ]
}).catch(err => console.error(err));