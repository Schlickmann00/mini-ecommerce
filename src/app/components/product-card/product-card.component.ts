import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';  // necessário para *ngIf, *ngFor
import { Product } from '../../models/product.model';
import { CartService } from '../../core/cart.service';

@Component({
  standalone: true,
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  imports: [CommonModule]  // <- adiciona CommonModule
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
