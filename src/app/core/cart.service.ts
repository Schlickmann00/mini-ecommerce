import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart = new BehaviorSubject<Product[]>([]);
  cart$ = this.cart.asObservable();

  addToCart(product: Product) {
    const current = this.cart.value;
    this.cart.next([...current, product]);
  }

  removeFromCart(productId: string) {
    this.cart.next(this.cart.value.filter(p => p.id !== productId));
  }

  clearCart() {
    this.cart.next([]);
  }

  getTotal(): number {
    return this.cart.value.reduce((sum, p) => sum + p.price, 0);
  }
}
