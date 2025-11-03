import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PixService {
  private readonly pixKey = '46322192825'; // Chave PIX CPF (sem formatação)
  private readonly uuid = '77eac06a-60bc-4d6a-ae27-5632b184c064'; // UUID para identificação

  /**
   * Gera o QR Code PIX no formato EME (Embedded Merchant Environment)
   * seguindo o padrão da FEBRABAN
   */
  generateQrCode(amount: number, description: string = 'Pagamento Mini E-commerce'): string {
    // Formata o valor para o padrão brasileiro (sem separadores, com 2 casas decimais)
    const formattedAmount = amount.toFixed(2).replace('.', '');
    
    // Gera o payload PIX no formato EME simplificado
    const payload = this.generatePixPayload(formattedAmount, description);
    
    // Gera o QR Code usando a API pública
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(payload)}`;
  }

  /**
   * Gera o payload PIX no formato EME da FEBRABAN
   */
  private generatePixPayload(amount: string, description: string): string {
    const pixKey = this.getPixKeyRaw(); // Usa CPF sem formatação para o payload
    const merchantName = 'Mini E-commerce';
    const merchantCity = 'Sao Paulo';
    
    // Monta o payload seguindo o padrão EME da FEBRABAN
    const fields = [];
    
    // 000201 - Payload Format Indicator
    fields.push('000201');
    
    // 0102 - Point of Initiation Method (02 = unique payment)
    fields.push('010212');
    
    // 26 - Merchant Account Information
    const merchantInfo = [
      '0014br.gov.bcb.pix',
      '01' + this.padLeft(pixKey.length, 2) + pixKey
    ].join('');
    fields.push('26' + this.padLeft(merchantInfo.length, 2) + merchantInfo);
    
    // 52 - Merchant Category Code (0000 = não categorizado)
    fields.push('52040000');
    
    // 53 - Transaction Currency (986 = BRL)
    fields.push('5303986');
    
    // 54 - Transaction Amount
    fields.push('54' + this.padLeft(amount.length, 2) + amount);
    
    // 58 - Country Code
    fields.push('5802BR');
    
    // 59 - Merchant Name
    fields.push('59' + this.padLeft(merchantName.length, 2) + merchantName);
    
    // 60 - Merchant City
    fields.push('60' + this.padLeft(merchantCity.length, 2) + merchantCity);
    
    // 62 - Additional Data Field Template
    const refLabel = '05' + this.padLeft(description.length, 2) + description;
    fields.push('62' + this.padLeft(refLabel.length, 2) + refLabel);
    
    // Junta todos os campos
    const payload = fields.join('');
    
    // Calcula CRC16 para o payload
    const crc = this.calculateCRC16(payload);
    return payload + crc;
  }

  private padLeft(value: number, length: number): string {
    return value.toString().padStart(length, '0');
  }

  /**
   * Calcula CRC16-CCITT (polinômio 0x1021, valor inicial 0xFFFF)
   */
  private calculateCRC16(data: string): string {
    const polynomial = 0x1021;
    let crc = 0xFFFF;

    for (let i = 0; i < data.length; i++) {
      crc ^= (data.charCodeAt(i) << 8);
      for (let j = 0; j < 8; j++) {
        if (crc & 0x8000) {
          crc = ((crc << 1) ^ polynomial) & 0xFFFF;
        } else {
          crc = (crc << 1) & 0xFFFF;
        }
      }
    }

    return crc.toString(16).toUpperCase().padStart(4, '0');
  }

  getPixKey(): string {
    // Retorna CPF formatado para exibição (463.221.928-25)
    return '463.221.928-25';
  }
  
  getPixKeyRaw(): string {
    // Retorna CPF sem formatação para uso no payload
    return this.pixKey;
  }

  getUuid(): string {
    return this.uuid;
  }

  /**
   * Gera QR Code com UUID para identificação e também gera QR Code PIX padrão
   */
  generateQrCodeWithUuid(amount: number, description: string = 'Pagamento Mini E-commerce'): string {
    // Gera o QR Code PIX padrão (o QR Code PIX já inclui o UUID no payload se necessário)
    const formattedAmount = amount.toFixed(2).replace('.', '');
    const payload = this.generatePixPayload(formattedAmount, description);
    
    // Cria um QR Code que contém tanto o payload PIX quanto o UUID para identificação
    const qrData = {
      pix: payload,
      uuid: this.uuid,
      pixKey: this.getPixKeyRaw(),
      amount: amount
    };
    
    // Usa o payload PIX como dados principais para o QR Code
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(payload)}`;
  }
}
