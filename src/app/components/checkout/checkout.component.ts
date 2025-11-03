import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { PixService } from '../../core/pix.service';
import { Product } from '../../models/product.model';
import { Order } from '../../models/order.model';
import { OrderService } from '../../core/order.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-checkout',
  imports: [CommonModule, RouterLink],
  styles: [`
    .checkout-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      min-height: calc(100vh - 80px);
    }

    .checkout-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 2rem;
      text-align: center;
    }

    .checkout-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      margin-top: 2rem;
    }

    .order-summary {
      background: var(--bg-white);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-md);
      padding: 2rem;
    }

    .summary-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid var(--border-color);
    }

    .order-items {
      margin-bottom: 2rem;
    }

    .order-item {
      display: flex;
      justify-content: space-between;
      padding: 1rem 0;
      border-bottom: 1px solid var(--border-color);
    }

    .order-item:last-child {
      border-bottom: none;
    }

    .item-info {
      flex-grow: 1;
    }

    .item-name {
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }

    .item-quantity {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .item-price {
      font-weight: 600;
      color: var(--text-primary);
    }

    .summary-total {
      display: flex;
      justify-content: space-between;
      padding-top: 1.5rem;
      border-top: 2px solid var(--border-color);
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 2rem;
    }

    .payment-section {
      background: var(--bg-white);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-md);
      padding: 2rem;
      text-align: center;
    }

    .payment-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }

    .payment-subtitle {
      color: var(--text-secondary);
      margin-bottom: 2rem;
      font-size: 0.875rem;
    }

    .qr-code-container {
      background: white;
      padding: 2rem;
      border-radius: var(--border-radius);
      border: 2px dashed var(--border-color);
      margin-bottom: 2rem;
      display: inline-block;
    }

    .qr-code {
      width: 250px;
      height: 250px;
      border-radius: var(--border-radius);
    }

    .payment-info {
      background: var(--bg-light);
      padding: 1.5rem;
      border-radius: var(--border-radius);
      margin-bottom: 2rem;
      text-align: left;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;
    }

    .info-row:last-child {
      margin-bottom: 0;
    }

    .info-label {
      color: var(--text-secondary);
      font-size: 0.875rem;
    }

    .info-value {
      font-weight: 600;
      color: var(--text-primary);
      font-family: monospace;
      font-size: 0.875rem;
    }

    .pix-key-display {
      background: white;
      padding: 1rem;
      border-radius: var(--border-radius);
      border: 1px solid var(--border-color);
      word-break: break-all;
      font-family: monospace;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .copy-button {
      background: var(--primary-color);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: var(--border-radius);
      font-weight: 600;
      margin-top: 1rem;
      transition: var(--transition);
      cursor: pointer;
    }

    .copy-button:hover {
      background: var(--primary-hover);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }

    .copy-button.copied {
      background: var(--secondary-color);
    }

    .success-message {
      background: #d1fae5;
      color: #065f46;
      padding: 1rem;
      border-radius: var(--border-radius);
      margin-top: 1rem;
      font-weight: 500;
    }

    .back-button {
      display: inline-block;
      color: var(--primary-color);
      padding: 0.75rem 1.5rem;
      border-radius: var(--border-radius);
      font-weight: 600;
      margin-top: 2rem;
      transition: var(--transition);
      border: 2px solid var(--primary-color);
      background: transparent;
    }

    .back-button:hover {
      background: var(--primary-color);
      color: white;
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

    @media (max-width: 768px) {
      .checkout-container {
        padding: 1rem;
      }

      .checkout-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .qr-code {
        width: 200px;
        height: 200px;
      }
    }
  `],
  template: `
    <div class="checkout-container">
      <h1 class="checkout-title">💳 Finalizar Compra</h1>
      
      <div *ngIf="cart.length > 0; else emptyCart">
        <div class="checkout-content">
          <div class="order-summary">
            <h2 class="summary-title">Resumo do Pedido</h2>
            
            <div class="order-items">
              <div class="order-item" *ngFor="let item of cart">
                <div class="item-info">
                  <div class="item-name">{{ item.name }}</div>
                  <div class="item-quantity">Qtd: 1</div>
                </div>
                <div class="item-price">R$ {{ item.price | number:'1.2-2' }}</div>
              </div>
            </div>

            <div class="summary-total">
              <span>Total</span>
              <span>R$ {{ total | number:'1.2-2' }}</span>
            </div>
          </div>

          <div class="payment-section">
            <h2 class="payment-title">💰 Pagamento via PIX</h2>
            <p class="payment-subtitle">Escaneie o QR Code ou copie a chave PIX</p>
            
            <div class="qr-code-container">
              <img [src]="qrCodeUrl" alt="QR Code PIX" class="qr-code" />
            </div>

            <div class="payment-info">
              <div class="info-row">
                <span class="info-label">Valor:</span>
                <span class="info-value">R$ {{ total | number:'1.2-2' }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Chave PIX (CPF):</span>
              </div>
              <div class="pix-key-display">{{ pixKey }}</div>
              <div class="info-row" style="margin-top: 1rem;">
                <span class="info-label">UUID:</span>
              </div>
              <div class="pix-key-display">{{ pixService.getUuid() }}</div>
            </div>

            <button class="copy-button" [class.copied]="copied" (click)="copyPixKey()">
              {{ copied ? '✓ Chave Copiada!' : '📋 Copiar Chave PIX' }}
            </button>

            <div class="success-message" *ngIf="copied">
              Chave PIX copiada para a área de transferência!
            </div>

            <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border-color);">
              <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 1rem;">
                Após o pagamento, seu pedido será processado automaticamente.
              </p>
              <button class="copy-button" style="margin-right: 1rem;" (click)="confirmOrder()">
                ✅ Confirmar Pedido
              </button>
              <button class="back-button" routerLink="/home">
                ← Voltar para Home
              </button>
            </div>
          </div>
        </div>
      </div>

      <ng-template #emptyCart>
        <div class="empty-cart">
          <h2>Seu carrinho está vazio</h2>
          <p>Adicione produtos ao carrinho para finalizar a compra</p>
          <button class="back-button" routerLink="/home">
            Continuar Comprando
          </button>
        </div>
      </ng-template>
    </div>
  `
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  cart: Product[] = [];
  total: number = 0;
  qrCodeUrl: string = '';
  pixKey: string = '';
  copied: boolean = false;

  constructor(
    private cartService: CartService,
    public pixService: PixService,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.cartService.cart$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.cart = items;
        this.total = this.cartService.getTotal();
        this.updateQrCode();
      });

    this.pixKey = this.pixService.getPixKey();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateQrCode() {
    if (this.total > 0) {
      const description = `Pedido Mini E-commerce - ${this.cart.length} item(s)`;
      // Usa o método que inclui UUID no QR Code
      this.qrCodeUrl = this.pixService.generateQrCodeWithUuid(this.total, description);
    }
  }

  copyPixKey() {
    navigator.clipboard.writeText(this.pixKey).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 3000);
    }).catch(err => {
      console.error('Erro ao copiar:', err);
      // Fallback para navegadores mais antigos
      const textArea = document.createElement('textarea');
      textArea.value = this.pixKey;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 3000);
    });
  }

  confirmOrder() {
    if (this.cart.length === 0 || this.total <= 0) {
      return;
    }
    const order: Order = {
      id: (typeof globalThis !== 'undefined' && (globalThis as any).crypto && typeof (globalThis as any).crypto.randomUUID === 'function')
        ? (globalThis as any).crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      userId: 'anônimo',
      products: this.cart,
      total: this.total,
      date: new Date()
    };
    this.orderService.setOrder(order);
    this.cartService.clearCart();
    this.router.navigate(['/order-confirmation']);
  }
}
