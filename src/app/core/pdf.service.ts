import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import jsPDF from 'jspdf';

@Injectable({ providedIn: 'root' })
export class PdfService {
  private storeName = 'Gustavo Store';
  private brandBlue = '#1e3a8a';
  private slate600 = '#475569';

  async generateOrderPdf(order: Order, paymentMethod: string = 'PIX', logoUrl: string = 'assets/logo.png') {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;
    let y = 16;

    // Header brand bar
    doc.setFillColor(this.brandBlue);
    doc.rect(0, 0, pageWidth, 28, 'F');

    // Logo (optional) com tentativas múltiplas
    if (logoUrl) {
      try {
        const dataUrl = await this.tryLoadAny([logoUrl, 'assets/logo.jpg', 'assets/logo.svg']);
        doc.addImage(dataUrl, 'PNG', margin, 6, 22, 16, undefined, 'FAST');
      } catch {}
    }

    // Store name and title
    doc.setTextColor('#ffffff');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text(this.storeName, margin + 26, 13);
    doc.setFontSize(18);
    doc.text('Confirmacao de Pedido', margin + 26, 22);

    // Card with order meta
    y = 40;
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, pageWidth - margin * 2, 24, 3, 3);
    doc.setTextColor(this.slate600);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(`Pedido: ${order.id || '-'}`, margin + 6, y + 8);
    doc.text(`Data: ${new Date(order.date).toLocaleString()}`, margin + 6, y + 16);
    doc.text(`Usuario: ${order.userId || 'anonimo'}`, pageWidth / 2, y + 8);
    doc.text(`Pagamento: ${paymentMethod}`, pageWidth / 2, y + 16);

    // Table header
    y += 34;
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, y, pageWidth - margin * 2, 10, 'F');
    doc.setTextColor('#0f172a');
    doc.setFont('helvetica', 'bold');
    doc.text('Item', margin + 4, y + 7);
    doc.text('Preco', pageWidth - margin - 25, y + 7, { align: 'left' });

    // Items
    y += 14;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#0f172a');
    order.products.forEach((p, i) => {
      const price = this.formatBRL(p.price);
      const text = `${i + 1}. ${p.name}`;
      doc.text(text, margin + 4, y);
      doc.text(price, pageWidth - margin - 4, y, { align: 'right' });
      y += 8;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    // Total
    y += 6;
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Total', pageWidth - margin - 35, y, { align: 'left' });
    doc.text(this.formatBRL(order.total), pageWidth - margin - 4, y, { align: 'right' });

    // Footer note
    y += 16;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(this.slate600);
    doc.setFontSize(10);
    doc.text('Obrigado pela sua compra!', margin, y);

    doc.save(`pedido_${(order.id || 'sem-id')}.pdf`);
  }

  private formatBRL(value: number): string {
    try { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value); }
    catch { return `R$ ${value.toFixed(2)}`; }
  }

  private loadImageDataUrl(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject('no-ctx');
          ctx.drawImage(img, 0, 0);
          const data = canvas.toDataURL('image/png');
          resolve(data);
        } catch (e) { reject(e); }
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  private async tryLoadAny(urls: string[]): Promise<string> {
    let lastErr: any;
    for (const u of urls) {
      try { return await this.loadImageDataUrl(u); } catch (e) { lastErr = e; }
    }
    throw lastErr || new Error('logo-not-found');
  }
}


