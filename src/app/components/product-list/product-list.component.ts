import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/product.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [CommonModule, ProductCardComponent, RouterLink],
  styles: [`
    .product-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
      padding: 2rem 0;
    }

    .loading, .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: var(--text-secondary);
      background: var(--bg-white);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-md);
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

    .empty-state h3 {
      margin-bottom: 1rem;
      color: var(--text-primary);
      font-size: 1.5rem;
    }

    .add-products-link {
      display: inline-block;
      background: var(--primary-color);
      color: white;
      padding: 0.875rem 2rem;
      border-radius: var(--border-radius);
      font-weight: 600;
      text-decoration: none;
      transition: var(--transition);
    }

    .add-products-link:hover {
      background: var(--primary-hover);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    @media (max-width: 768px) {
      .product-list {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 1.5rem;
      }
    }

    @media (max-width: 480px) {
      .product-list {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }
  `],
  template: `
    <div class="product-list" *ngIf="products.length > 0 && !loading">
      <app-product-card *ngFor="let product of products" [product]="product"></app-product-card>
    </div>
    
    <div class="loading" *ngIf="loading">
      <div class="spinner"></div>
      <p>Carregando produtos...</p>
      <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 1rem;">
        Se demorar muito, verifique se os produtos foram adicionados ao Firestore
      </p>
    </div>
    
    <div class="empty-state" *ngIf="!loading && products.length === 0">
      <h3>📦 Nenhum produto encontrado</h3>
      <p style="margin-bottom: 1.5rem;">Não há produtos cadastrados ainda.</p>
      <p style="margin-bottom: 1rem; color: var(--text-secondary);">
        Para adicionar produtos de tecnologia, acesse a página de administração.
      </p>
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <a routerLink="/admin/add-products" class="add-products-link">
          ➕ Adicionar Produtos Agora
        </a>
        <button 
          (click)="loadProducts()" 
          class="add-products-link"
          style="border: none; cursor: pointer;">
          🔄 Recarregar Produtos
        </button>
      </div>
    </div>
  `
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.products = [];
    
    this.productService.getProducts().subscribe({
      next: (res) => {
        console.log('Produtos carregados:', res);
        this.products = res || [];
        this.loading = false;
        
        if (this.products.length === 0) {
          console.warn('Nenhum produto encontrado no Firestore. Acesse /admin/add-products para adicionar produtos.');
        }
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        this.products = [];
        this.loading = false;
        
        // Mostra mensagem de erro mais clara
        alert('Erro ao carregar produtos. Verifique sua conexão com o Firebase e as regras de segurança do Firestore.');
      }
    });
  }
}
