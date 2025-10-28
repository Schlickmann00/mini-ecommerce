import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // necessário para *ngIf, *ngFor
import { CartService } from '../../core/cart.service';
import { PixService } from '../../core/pix.service';

@Component({
  standalone: true,
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  imports: [CommonModule]  // <- adiciona CommonModule
})
export class CheckoutComponent {
  total: number = 0;
  qrCodeUrl: string = '';

  constructor(private cartService: CartService, private pixService: PixService) {
    this.total = cartService.getTotal();
    this.qrCodeUrl = pixService.generateQrCode(this.total, 'SEU_PIX_KEY');
  }
}
