import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AddProductsService } from '../../core/add-products.service';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styles: [`
    .admin-container {
      max-width: 900px;
      margin: 2rem auto;
      padding: 2rem;
      min-height: calc(100vh - 80px);
    }

    .admin-card {
      background: var(--bg-white);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-md);
      padding: 2rem;
      margin-bottom: 2rem;
    }

    .admin-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1rem;
      text-align: center;
    }

    .admin-subtitle {
      color: var(--text-secondary);
      text-align: center;
      margin-bottom: 2rem;
      font-size: 0.875rem;
    }

    .info-box {
      background: var(--bg-light);
      padding: 1.5rem;
      border-radius: var(--border-radius);
      margin-bottom: 2rem;
      border-left: 4px solid var(--primary-color);
    }

    .info-box h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.75rem;
    }

    .info-box ul {
      margin-left: 1.5rem;
      color: var(--text-secondary);
      line-height: 1.8;
    }

    .info-box li {
      margin-bottom: 0.5rem;
    }

    .btn-add {
      width: 100%;
      background: var(--primary-color);
      color: white;
      padding: 1.25rem;
      border-radius: var(--border-radius);
      font-weight: 600;
      font-size: 1.125rem;
      transition: var(--transition);
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .btn-add:hover:not(:disabled) {
      background: var(--primary-hover);
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    .btn-add:disabled {
      background: var(--text-secondary);
      cursor: not-allowed;
      opacity: 0.6;
      transform: none;
    }

    .btn-back {
      display: inline-block;
      color: var(--text-secondary);
      padding: 0.75rem 1.5rem;
      border-radius: var(--border-radius);
      font-weight: 500;
      text-decoration: none;
      transition: var(--transition);
      margin-top: 1rem;
      border: 1px solid var(--border-color);
    }

    .btn-back:hover {
      background: var(--bg-light);
      color: var(--primary-color);
      border-color: var(--primary-color);
    }

    .success-message {
      background: #d1fae5;
      color: #065f46;
      padding: 1.25rem;
      border-radius: var(--border-radius);
      margin-bottom: 1rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .error-message {
      background: #fee2e2;
      color: #991b1b;
      padding: 1.25rem;
      border-radius: var(--border-radius);
      margin-bottom: 1rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .results {
      margin-top: 2rem;
    }

    .results-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }

    .result-item {
      padding: 1rem;
      margin-bottom: 0.75rem;
      border-radius: var(--border-radius);
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: var(--transition);
    }

    .result-item:hover {
      transform: translateX(4px);
    }

    .result-item.success {
      background: #d1fae5;
      color: #065f46;
      border-left: 4px solid var(--secondary-color);
    }

    .result-item.error {
      background: #fee2e2;
      color: #991b1b;
      border-left: 4px solid var(--danger-color);
    }

    .result-name {
      font-weight: 500;
    }

    .result-status {
      font-weight: 600;
      font-size: 0.875rem;
    }

    @media (max-width: 768px) {
      .admin-container {
        padding: 1rem;
      }

      .admin-card {
        padding: 1.5rem;
      }
    }
  `],
  template: `
    <div class="admin-container">
      <div class="admin-card">
        <h1 class="admin-title">🔧 Adicionar Produtos ao Firebase</h1>
        <p class="admin-subtitle">Adicione produtos de tecnologia ao Firestore de forma rápida e fácil</p>

        <div class="info-box">
          <h3>📋 Produtos que serão adicionados:</h3>
          <ul>
            <li>MacBook Pro 14" M3</li>
            <li>iPhone 15 Pro Max</li>
            <li>Dell XPS 13 Plus</li>
            <li>Samsung Galaxy S24 Ultra</li>
            <li>iPad Pro 12.9" M2</li>
            <li>PlayStation 5</li>
            <li>AirPods Pro 2</li>
            <li>Monitor LG UltraWide 34"</li>
            <li>Teclado Mecânico Logitech MX</li>
            <li>Mouse Logitech MX Master 3S</li>
            <li>Webcam Logitech C920</li>
            <li>Apple Watch Series 9</li>
          </ul>
        </div>

        <button 
          class="btn-add" 
          (click)="addProducts()" 
          [disabled]="loading">
          <span *ngIf="!loading">➕</span>
          <span *ngIf="loading">⏳</span>
          {{ loading ? 'Adicionando produtos...' : 'Adicionar Produtos ao Firestore' }}
        </button>

        <div class="success-message" *ngIf="successMessage">
          <span>✓</span>
          <span>{{ successMessage }}</span>
        </div>

        <div class="error-message" *ngIf="errorMessage">
          <span>✗</span>
          <div style="flex: 1;">
            <div style="font-weight: 600; margin-bottom: 0.5rem;">Erro ao adicionar produtos:</div>
            <div style="font-size: 0.875rem; word-break: break-word;">{{ errorMessage }}</div>
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(153, 27, 27, 0.2);">
              <strong>Como resolver:</strong>
              <ul style="margin-top: 0.5rem; margin-left: 1.5rem; font-size: 0.875rem;">
                <li>Abra o console do navegador (F12) para ver mais detalhes</li>
                <li>Verifique se você está logado no Firebase</li>
                <li>Verifique as regras de segurança do Firestore no Firebase Console</li>
                <li>Certifique-se de que a coleção "products" existe no Firestore</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="results" *ngIf="results.length > 0">
          <h3 class="results-title">📊 Resultados Detalhados:</h3>
          <div 
            *ngFor="let result of results" 
            [class]="'result-item ' + (result.success ? 'success' : 'error')"
            style="flex-direction: column; align-items: flex-start;">
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
              <span class="result-name">{{ result.name }}</span>
              <span class="result-status">
                {{ result.success ? '✓ Adicionado com Sucesso' : '✗ Erro ao Adicionar' }}
              </span>
            </div>
            <div *ngIf="!result.success && result.error" style="width: 100%; margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid rgba(0,0,0,0.1); font-size: 0.75rem; color: var(--text-secondary);">
              <strong>Erro:</strong> {{ result.error?.message || result.error?.code || 'Erro desconhecido' }}
            </div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 2rem;">
          <a routerLink="/home" class="btn-back">
            ← Voltar para Home
          </a>
        </div>
      </div>
    </div>
  `
})
export class AddProductsComponent {
  loading = false;
  successMessage = '';
  errorMessage = '';
  results: Array<{ success: boolean; name: string; id?: string; error?: any }> = [];

  constructor(private addProductsService: AddProductsService) {}

  async addProducts() {
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.results = [];

    try {
      console.log('Iniciando adição de produtos...');
      const results = await this.addProductsService.addSampleProducts();
      console.log('Resultados recebidos:', results);
      this.results = results;
      
      const successCount = results.filter(r => r.success).length;
      const errorCount = results.filter(r => !r.success).length;
      
      if (successCount > 0) {
        this.successMessage = `✓ ${successCount} produto(s) adicionado(s) com sucesso!`;
      }
      
      if (errorCount > 0) {
        const errors = results.filter(r => !r.success);
        const errorDetails = errors.map(e => {
          const errorMsg = e.error?.message || e.error?.code || JSON.stringify(e.error);
          return `${e.name}: ${errorMsg}`;
        }).join('; ');
        this.errorMessage = `✗ ${errorCount} produto(s) falharam. Detalhes: ${errorDetails}`;
        console.error('Erros detalhados:', errors);
      }

      if (successCount === 0 && errorCount === 0) {
        this.errorMessage = 'Nenhum produto foi processado. Verifique o console para mais detalhes.';
      }
    } catch (error: any) {
      console.error('Erro ao adicionar produtos:', error);
      const errorMsg = error?.message || error?.code || JSON.stringify(error);
      this.errorMessage = `Erro ao adicionar produtos: ${errorMsg}. Verifique o console para mais detalhes.`;
      
      // Mostra informações úteis para debug
      if (error?.code) {
        this.errorMessage += ` Código do erro: ${error.code}`;
      }
      if (error?.message?.includes('permission')) {
        this.errorMessage += ' Isso geralmente indica um problema com as regras de segurança do Firestore.';
      }
    } finally {
      this.loading = false;
    }
  }
}

