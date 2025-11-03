import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../core/cart.service';

@Component({
  standalone: true,
  selector: 'app-product-card',
  imports: [CommonModule],
  styles: [`
    .product-card {
      background: var(--bg-white);
      border-radius: var(--border-radius);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      transition: var(--transition);
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .product-card:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-4px);
    }

    .product-image {
      width: 100%;
      height: 250px;
      object-fit: cover;
      background: var(--bg-light);
    }

    .product-info {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .product-name {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
      line-height: 1.3;
    }

    .product-description {
      color: var(--text-secondary);
      font-size: 0.875rem;
      margin-bottom: 1rem;
      flex-grow: 1;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .product-price {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: 1rem;
    }

    .btn-add-cart {
      width: 100%;
      background: var(--primary-color);
      color: white;
      padding: 0.75rem;
      border-radius: var(--border-radius);
      font-weight: 600;
      font-size: 1rem;
      transition: var(--transition);
    }

    .btn-add-cart:hover {
      background: var(--primary-hover);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }

    .btn-add-cart:active {
      transform: translateY(0);
    }

    .btn-add-cart.added {
      background: var(--secondary-color);
      animation: pulse 0.3s ease;
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `],
  template: `
    <div class="product-card">
      <img [src]="product.image || 'https://via.placeholder.com/300x250?text=Sem+Imagem'"
           [alt]="product.name"
           class="product-image"
           (click)="navigateToDetails()"
           [style.cursor]="'pointer'"
           (error)="$event.target.src='https://via.placeholder.com/300x250?text=Sem+Imagem'">
      <div class="product-info">
        <h3 class="product-name" (click)="navigateToDetails()" [style.cursor]="'pointer'">{{ product.name }}</h3>
        <p class="product-description">{{ product.description }}</p>
        <div class="product-price">R$ {{ product.price | number:'1.2-2' }}</div>
        <button
          class="btn-add-cart"
          [class.added]="added"
          (click)="addToCart($event)"
          [disabled]="added">
          {{ added ? '✓ Adicionado!' : '🛒 Adicionar ao Carrinho' }}
        </button>
      </div>
    </div>
  `
})
export class ProductCardComponent {
  @Input() product!: Product;
  added = false;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  navigateToDetails() {
    if (this.product.id) {
      this.router.navigate(['/product', this.product.id]);
    }
  }

  addToCart(event: Event) {
    event.stopPropagation(); // Evita navegar ao clicar no botão
    this.cartService.addToCart(this.product);
    this.added = true;

    // Reseta o estado após 2 segundos
    setTimeout(() => {
      this.added = false;
    }, 2000);
  }
}
