import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { Product } from '../../models/product.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  styles: [`
    .cart-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      min-height: calc(100vh - 80px);
    }

    .cart-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 2rem;
      text-align: center;
    }

    .cart-content {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 2rem;
    }

    .cart-items {
      background: var(--bg-white);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-md);
      overflow: hidden;
    }

    .cart-item {
      display: flex;
      gap: 1.5rem;
      padding: 1.5rem;
      border-bottom: 1px solid var(--border-color);
      align-items: center;
    }

    .cart-item:last-child {
      border-bottom: none;
    }

    .item-image {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: var(--border-radius);
      background: var(--bg-light);
    }

    .item-details {
      flex-grow: 1;
    }

    .item-name {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }

    .item-price {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--primary-color);
    }

    .btn-remove {
      background: var(--danger-color);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: var(--border-radius);
      font-weight: 500;
      transition: var(--transition);
    }

    .btn-remove:hover {
      background: #dc2626;
      transform: translateY(-1px);
    }

    .cart-summary {
      background: var(--bg-white);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-md);
      padding: 2rem;
      height: fit-content;
      position: sticky;
      top: 100px;
    }

    .summary-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1.5rem;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      color: var(--text-secondary);
    }

    .summary-total {
      display: flex;
      justify-content: space-between;
      padding-top: 1rem;
      border-top: 2px solid var(--border-color);
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1.5rem;
    }

    .btn-checkout {
      width: 100%;
      background: var(--secondary-color);
      color: white;
      padding: 1rem;
      border-radius: var(--border-radius);
      font-weight: 600;
      font-size: 1.125rem;
      transition: var(--transition);
    }

    .btn-checkout:hover {
      background: #059669;
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    .btn-checkout:disabled {
      background: var(--text-secondary);
      cursor: not-allowed;
      transform: none;
    }

    .empty-cart {
      text-align: center;
      padding: 4rem 2rem;
      background: var(--bg-white);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-md);
    }

    .empty-cart h2 {
      font-size: 1.5rem;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }

    .empty-cart p {
      color: var(--text-secondary);
      margin-bottom: 2rem;
    }

    .btn-continue {
      background: var(--primary-color);
      color: white;
      padding: 0.75rem 2rem;
      border-radius: var(--border-radius);
      font-weight: 600;
      transition: var(--transition);
    }

    .btn-continue:hover {
      background: var(--primary-hover);
      transform: translateY(-1px);
    }

    @media (max-width: 768px) {
      .cart-container {
        padding: 1rem;
      }

      .cart-content {
        grid-template-columns: 1fr;
      }

      .cart-summary {
        position: static;
      }

      .cart-item {
        flex-direction: column;
        text-align: center;
      }

      .item-image {
        width: 150px;
        height: 150px;
      }
    }
  `],
  template: `
    <div class="cart-container">
      <h1 class="cart-title">🛒 Meu Carrinho</h1>
      
      <div *ngIf="cart.length > 0; else emptyCart">
        <div class="cart-content">
          <div class="cart-items">
            <div class="cart-item" *ngFor="let item of cart">
              <img [src]="item.image || 'https://via.placeholder.com/100?text=Produto'" 
                   [alt]="item.name" 
                   class="item-image"
                   (error)="$event.target.src='https://via.placeholder.com/100?text=Produto'">
              <div class="item-details">
                <h3 class="item-name">{{ item.name }}</h3>
                <p class="item-price">R$ {{ item.price | number:'1.2-2' }}</p>
              </div>
              <button class="btn-remove" (click)="remove(item.id!)">
                Remover
              </button>
            </div>
          </div>

          <div class="cart-summary">
            <h2 class="summary-title">Resumo</h2>
            <div class="summary-row">
              <span>Itens ({{ cart.length }})</span>
              <span>R$ {{ getSubtotal() | number:'1.2-2' }}</span>
            </div>
            <div class="summary-total">
              <span>Total</span>
              <span>R$ {{ getTotal() | number:'1.2-2' }}</span>
            </div>
            <button class="btn-checkout" routerLink="/checkout">
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>

      <ng-template #emptyCart>
        <div class="empty-cart">
          <h2>Seu carrinho está vazio</h2>
          <p>Adicione produtos ao carrinho para continuar</p>
          <button class="btn-continue" routerLink="/home">
            Continuar Comprando
          </button>
        </div>
      </ng-template>
    </div>
  `
})
export class CartComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  cart: Product[] = [];

  constructor(
    public cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cart$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.cart = items;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  remove(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  getSubtotal(): number {
    return this.getTotal();
  }
}
