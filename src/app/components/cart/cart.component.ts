import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // necessário para *ngFor
import { CartService } from '../../core/cart.service';
import { Product } from '../../models/product.model';

@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports: [CommonModule]  // <- adiciona CommonModule
})
export class CartComponent {
  cart: Product[] = [];

  constructor(public cartService: CartService) {
    cartService.cart$.subscribe(items => this.cart = items);
  }

  remove(productId: string) {
    this.cartService.removeFromCart(productId);
  }
}
