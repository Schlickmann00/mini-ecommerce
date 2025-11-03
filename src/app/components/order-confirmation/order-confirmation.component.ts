import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OrderService } from '../../core/order.service';
import { PdfService } from '../../core/pdf.service';
import { Order } from '../../models/order.model';

@Component({
  standalone: true,
  selector: 'app-order-confirmation',
  imports: [CommonModule, RouterLink],
  styles: [`
    .container { max-width: 900px; margin: 0 auto; padding: 2rem; }
    .card { background: var(--bg-white); border-radius: var(--border-radius); box-shadow: var(--shadow-md); padding: 2rem; }
    .title { font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem; }
    .subtitle { color: var(--text-secondary); margin-bottom: 1.5rem; }
    .row { display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid var(--border-color); }
    .row:last-child { border-bottom: none; }
    .items { margin-top: 1rem; margin-bottom: 1rem; }
    .total { display: flex; justify-content: space-between; font-weight: 700; font-size: 1.25rem; padding-top: 1rem; border-top: 2px solid var(--border-color); }
    .actions { margin-top: 2rem; display: flex; gap: 1rem; flex-wrap: wrap; }
    .btn-primary { background: var(--primary-color); color: white; padding: 0.75rem 1.25rem; border-radius: var(--border-radius); font-weight: 600; }
    .btn-outline { border: 2px solid var(--primary-color); color: var(--primary-color); padding: 0.75rem 1.25rem; border-radius: var(--border-radius); font-weight: 600; }
    .empty { text-align: center; padding: 3rem 1rem; }
  `],
  template: `
    <div class="container">
      <ng-template #empty>
        <div class="card empty">
          <h2>Nenhum pedido encontrado</h2>
          <p>Finalize uma compra para ver a confirmacao do pedido.</p>
          <a class="btn-outline" routerLink="/home">Ir para Home</a>
        </div>
      </ng-template>

      <div *ngIf="order; else empty">
        <div class="card">
          <h1 class="title">Pedido confirmado!</h1>
          <p class="subtitle">Obrigado pela compra. Veja abaixo o resumo do seu pedido.</p>

          <div class="items">
            <div class="row" *ngFor="let p of order.products; let i = index">
              <span>{{ i + 1 }}. {{ p.name }}</span>
              <span>R$ {{ p.price | number:'1.2-2' }}</span>
            </div>
          </div>

          <div class="row">
            <span>Metodo de pagamento</span>
            <span>PIX</span>
          </div>
          <div class="total">
            <span>Total</span>
            <span>R$ {{ order.total | number:'1.2-2' }}</span>
          </div>

          <div class="actions">
            <button class="btn-primary" (click)="downloadPdf()">Baixar PDF do Pedido</button>
            <a class="btn-outline" routerLink="/home">Voltar para Home</a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class OrderConfirmationComponent implements OnInit {
  order: Order | null = null;

  constructor(
    private orderService: OrderService,
    private pdfService: PdfService,
    private router: Router
  ) {}

  ngOnInit() {
    this.order = this.orderService.getOrder();
  }

  async downloadPdf() {
    if (!this.order) return;
    await this.pdfService.generateOrderPdf(this.order, 'PIX', 'assets/logo.png');
  }
}


