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
import { RegisterComponent } from './app/components/register/register.component';
import { HomePageComponent } from './app/pages/home.page';
import { CartComponent } from './app/components/cart/cart.component';
import { CheckoutComponent } from './app/components/checkout/checkout.component';
import { AddProductsComponent } from './app/components/admin/add-products.component';
import { ProductDetailsComponent } from './app/components/product-details/product-details.component';
import { OrderConfirmationComponent } from './app/components/order-confirmation/order-confirmation.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [LoginRedirectGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginRedirectGuard] },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'product/:id', component: ProductDetailsComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'order-confirmation', component: OrderConfirmationComponent, canActivate: [AuthGuard] },
  { path: 'admin/add-products', component: AddProductsComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(FormsModule, ReactiveFormsModule),

    // 🔹 Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
}).catch(err => console.error(err));
