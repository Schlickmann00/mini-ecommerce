import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PixService {
  generateQrCode(amount: number, key: string) {
    return `https://api.qrserver.com/v1/create-qr-code/?data=PIX:${key}?amount=${amount}&size=150x150`;
  }
}
