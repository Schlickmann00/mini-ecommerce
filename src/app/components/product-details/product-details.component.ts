import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../core/product.service';
import { CartService } from '../../core/cart.service';
import { Product } from '../../models/product.model';
import { Observable, map } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-product-details',
  imports: [CommonModule, RouterLink],
  styles: [`
    .product-details-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      min-height: calc(100vh - 80px);
    }

    .back-button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-secondary);
      text-decoration: none;
      margin-bottom: 2rem;
      font-weight: 500;
      transition: var(--transition);
    }

    .back-button:hover {
      color: var(--primary-color);
    }

    .product-details-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      margin-bottom: 3rem;
    }

    .product-image-container {
      position: sticky;
      top: 100px;
      height: fit-content;
    }

    .product-image {
      width: 100%;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-lg);
      background: var(--bg-light);
    }

    .product-info {
      background: var(--bg-white);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-md);
      padding: 2rem;
    }

    .product-name {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }

    .product-price {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: 2rem;
    }

    .product-description {
      color: var(--text-secondary);
      line-height: 1.8;
      margin-bottom: 2rem;
      font-size: 1rem;
    }

    .specifications-section {
      margin-bottom: 2rem;
      padding-top: 2rem;
      border-top: 2px solid var(--border-color);
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }

    .specs-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .spec-item {
      background: var(--bg-light);
      padding: 1rem;
      border-radius: var(--border-radius);
    }

    .spec-label {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin-bottom: 0.5rem;
    }

    .spec-value {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .colors-section {
      margin-bottom: 2rem;
    }

    .colors-container {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .color-item {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 3px solid var(--border-color);
      cursor: pointer;
      transition: var(--transition);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 600;
      text-align: center;
      padding: 0.25rem;
    }

    .color-item:hover {
      transform: scale(1.1);
      border-color: var(--primary-color);
    }

    .color-item.selected {
      border-color: var(--primary-color);
      border-width: 4px;
    }

    .btn-add-cart {
      width: 100%;
      background: var(--primary-color);
      color: white;
      padding: 1.25rem;
      border-radius: var(--border-radius);
      font-weight: 600;
      font-size: 1.125rem;
      transition: var(--transition);
      border: none;
      cursor: pointer;
      margin-top: 1rem;
    }

    .btn-add-cart:hover {
      background: var(--primary-hover);
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
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

    .loading {
      text-align: center;
      padding: 4rem 2rem;
    }

    .spinner {
      border: 4px solid var(--border-color);
      border-top: 4px solid var(--primary-color);
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
      margin: 0 auto 1.5rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .not-found {
      text-align: center;
      padding: 4rem 2rem;
      background: var(--bg-white);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-md);
    }

    @media (max-width: 768px) {
      .product-details-container {
        padding: 1rem;
      }

      .product-details-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .product-image-container {
        position: static;
      }

      .specs-grid {
        grid-template-columns: 1fr;
      }

      .product-name {
        font-size: 1.5rem;
      }

      .product-price {
        font-size: 2rem;
      }
    }
  `],
  template: `
    <div class="product-details-container">
      <a routerLink="/home" class="back-button">
        ← Voltar para Produtos
      </a>

      <div *ngIf="product$ | async as product; else loadingOrNotFound">
        <div class="product-details-content">
          <div class="product-image-container">
            <img [src]="product.image || 'https://via.placeholder.com/600x600?text=Sem+Imagem'"
                 [alt]="product.name"
                 class="product-image"
                 (error)="$event.target.src='https://via.placeholder.com/600x600?text=Sem+Imagem'">
          </div>

          <div class="product-info">
            <h1 class="product-name">{{ product.name }}</h1>
            <div class="product-price">R$ {{ product.price | number:'1.2-2' }}</div>
            
            <p class="product-description">{{ product.description }}</p>

            <div class="specifications-section" *ngIf="hasSpecifications(product)">
              <h3 class="section-title">🔧 Especificações</h3>
              <div class="specs-grid">
                <div class="spec-item" *ngIf="product.memory">
                  <div class="spec-label">Memória RAM</div>
                  <div class="spec-value">{{ product.memory }}</div>
                </div>
                <div class="spec-item" *ngIf="product.storage">
                  <div class="spec-label">Armazenamento</div>
                  <div class="spec-value">{{ product.storage }}</div>
                </div>
                <div class="spec-item" *ngFor="let spec of getSpecifications(product)">
                  <div class="spec-label">{{ spec.key }}</div>
                  <div class="spec-value">{{ spec.value }}</div>
                </div>
              </div>
            </div>

            <div class="colors-section" *ngIf="product.colors && product.colors.length > 0">
              <h3 class="section-title">🎨 Cores Disponíveis</h3>
              <div class="colors-container">
                <div *ngFor="let color of product.colors"
                     class="color-item"
                     [class.selected]="selectedColor === color"
                     [style.background-color]="getColorValue(color)"
                     [style.color]="getTextColor(color)"
                     (click)="selectColor(color)"
                     [title]="color">
                  {{ color.length > 8 ? '' : color }}
                </div>
              </div>
            </div>

            <button
              class="btn-add-cart"
              [class.added]="added"
              (click)="addToCart(product)"
              [disabled]="added">
              {{ added ? '✓ Adicionado ao Carrinho!' : '🛒 Adicionar ao Carrinho' }}
            </button>
          </div>
        </div>
      </div>

      <ng-template #loadingOrNotFound>
        <div class="loading" *ngIf="loading">
          <div class="spinner"></div>
          <p>Carregando produto...</p>
        </div>
        <div class="not-found" *ngIf="!loading">
          <h2>Produto não encontrado</h2>
          <p>O produto que você está procurando não existe ou foi removido.</p>
          <button class="btn-add-cart" routerLink="/home" style="width: auto; display: inline-block; margin-top: 1rem;">
            Voltar para Produtos
          </button>
        </div>
      </ng-template>
    </div>
  `
})
export class ProductDetailsComponent implements OnInit {
  product$!: Observable<Product | null>;
  loading = true;
  added = false;
  selectedColor: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    
    if (productId) {
      this.product$ = this.productService.getProducts().pipe(
        map(products => {
          this.loading = false;
          return products.find(p => p.id === productId) || null;
        })
      );
    } else {
      this.loading = false;
      this.product$ = new Observable(observer => observer.next(null));
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.added = true;
    setTimeout(() => {
      this.added = false;
    }, 2000);
  }

  selectColor(color: string) {
    this.selectedColor = this.selectedColor === color ? null : color;
  }

  hasSpecifications(product: Product): boolean {
    return !!(product.memory || product.storage || (product.specifications && Object.keys(product.specifications).length > 0));
  }

  getSpecifications(product: Product): Array<{key: string, value: string}> {
    if (!product.specifications) return [];
    return Object.keys(product.specifications).map(key => ({
      key,
      value: product.specifications![key]
    }));
  }

  getColorValue(color: string): string {
    // Tenta converter nome de cor para valor hexadecimal
    const colorMap: {[key: string]: string} = {
      'preto': '#000000',
      'branco': '#FFFFFF',
      'cinza': '#808080',
      'prata': '#C0C0C0',
      'dourado': '#FFD700',
      'azul': '#0000FF',
      'vermelho': '#FF0000',
      'verde': '#008000',
      'rosa': '#FFC0CB'
    };
    return colorMap[color.toLowerCase()] || color;
  }

  getTextColor(color: string): string {
    const darkColors = ['preto', 'azul', 'vermelho', 'verde'];
    return darkColors.includes(color.toLowerCase()) ? '#FFFFFF' : '#000000';
  }
}

