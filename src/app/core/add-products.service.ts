import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class AddProductsService {
  constructor(private firestore: Firestore) {}

  async addSampleProducts() {
    const products: Omit<Product, 'id'>[] = [
      {
        name: 'MacBook Pro 14" M3',
        description: 'Notebook Apple com chip M3, ideal para profissionais. Tela Retina Liquid XDR de 14 polegadas com tecnologia Mini-LED. Performance excepcional para criação de conteúdo, programação e edição de vídeo.',
        price: 14999.00,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
        memory: '16GB',
        storage: '512GB SSD',
        colors: ['Cinza Espacial', 'Prata'],
        specifications: {
          'Processador': 'Apple M3',
          'Tela': '14" Retina Liquid XDR',
          'Bateria': 'Até 18 horas',
          'Portas': '3x Thunderbolt 4, HDMI, SD Card'
        }
      },
      {
        name: 'iPhone 15 Pro Max',
        description: 'Smartphone Apple com tela Super Retina XDR de 6.7", câmera de 48MP com sistema avançado de fotografia. Chip A17 Pro com arquitetura de 3nm. Design em titânio premium.',
        price: 9999.00,
        image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400',
        memory: '8GB',
        storage: '256GB',
        colors: ['Titânio Natural', 'Titânio Azul', 'Titânio Branco', 'Titânio Preto'],
        specifications: {
          'Câmera': '48MP Principal + 12MP Ultra Wide + 12MP Telephoto',
          'Tela': '6.7" Super Retina XDR OLED',
          'Chip': 'A17 Pro',
          'Bateria': 'Até 29 horas de vídeo'
        }
      },
      {
        name: 'Dell XPS 13 Plus',
        description: 'Ultrabook Dell com design minimalista e performance de alta classe. Tela OLED de 13.4" com resolução 4K. Ideal para produtividade e criatividade.',
        price: 8999.00,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
        memory: '16GB',
        storage: '512GB SSD',
        colors: ['Platina', 'Grafite'],
        specifications: {
          'Processador': 'Intel Core i7-1360P',
          'Tela': '13.4" OLED 4K',
          'Bateria': 'Até 15 horas',
          'Peso': '1.26 kg'
        }
      },
      {
        name: 'Samsung Galaxy S24 Ultra',
        description: 'Smartphone Samsung flagship com tela Dynamic AMOLED 2X de 6.8", câmera de 200MP com zoom espacial de 100x. S Pen integrada para produtividade.',
        price: 8499.00,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        memory: '12GB',
        storage: '256GB',
        colors: ['Preto', 'Roxo', 'Amarelo', 'Verde', 'Prata'],
        specifications: {
          'Câmera': '200MP Principal + 50MP Periscope + 12MP Ultra Wide',
          'Tela': '6.8" Dynamic AMOLED 2X',
          'Chip': 'Snapdragon 8 Gen 3',
          'S Pen': 'Incluída'
        }
      },
      {
        name: 'iPad Pro 12.9" M2',
        description: 'Tablet Apple com chip M2, tela Liquid Retina XDR de 12.9". Suporte a Apple Pencil e Magic Keyboard. Potência profissional em formato portátil.',
        price: 7999.00,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
        memory: '8GB',
        storage: '256GB',
        colors: ['Prata', 'Cinza Espacial'],
        specifications: {
          'Processador': 'Apple M2',
          'Tela': '12.9" Liquid Retina XDR',
          'Apple Pencil': 'Suporte Gen 2',
          'Bateria': 'Até 10 horas'
        }
      },
      {
        name: 'PlayStation 5',
        description: 'Console de videogame Sony PS5 com leitor de disco Blu-ray Ultra HD. Controle DualSense com feedback háptico avançado. Performance de próxima geração.',
        price: 3999.00,
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400',
        memory: '16GB GDDR6',
        storage: '825GB SSD NVMe',
        colors: ['Branco', 'Preto'],
        specifications: {
          'GPU': 'AMD RDNA 2 (10.28 TFLOPS)',
          'CPU': 'AMD Zen 2 8-core',
          'Ray Tracing': 'Suportado',
          'Resolução': 'Até 8K'
        }
      },
      {
        name: 'AirPods Pro 2',
        description: 'Fones de ouvido Apple com cancelamento de ruído ativo personalizado, chip H2, áudio espacial e resistência à água IPX4.',
        price: 2499.00,
        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400',
        memory: 'N/A',
        storage: 'N/A',
        colors: ['Branco'],
        specifications: {
          'Cancelamento de Ruído': 'ANC Ativo',
          'Bateria': 'Até 6 horas (30h com case)',
          'Chip': 'Apple H2',
          'Resistência': 'IPX4'
        }
      },
      {
        name: 'Monitor LG UltraWide 34"',
        description: 'Monitor curvado LG 34" com resolução 4K UHD, painel IPS, suporte HDR e taxa de atualização de 144Hz com FreeSync Premium.',
        price: 3499.00,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400',
        memory: 'N/A',
        storage: 'N/A',
        colors: ['Preto'],
        specifications: {
          'Resolução': '3440 x 1440 (UltraWide)',
          'Taxa de Atualização': '144Hz',
          'Painel': 'IPS',
          'Conexões': 'HDMI, DisplayPort, USB-C'
        }
      },
      {
        name: 'Teclado Mecânico Logitech MX',
        description: 'Teclado mecânico sem fio Logitech MX Keys com retroiluminação adaptativa, conexão Bluetooth e teclas de perfil baixo.',
        price: 899.00,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
        memory: 'N/A',
        storage: 'N/A',
        colors: ['Preto', 'Branco', 'Rosa'],
        specifications: {
          'Conexão': 'Bluetooth + USB-C',
          'Retroiluminação': 'Adaptativa',
          'Bateria': 'Até 5 meses',
          'Layout': 'QWERTY PT-BR'
        }
      },
      {
        name: 'Mouse Logitech MX Master 3S',
        description: 'Mouse sem fio Logitech MX Master 3S com sensor de 8K DPI, carregamento USB-C e design ergonômico para produtividade.',
        price: 599.00,
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
        memory: 'N/A',
        storage: 'N/A',
        colors: ['Preto', 'Branco', 'Rosa'],
        specifications: {
          'Sensor': '8K DPI',
          'Conexão': 'Bluetooth + USB Unifying',
          'Bateria': 'Até 70 dias',
          'Botões Programáveis': '7 botões'
        }
      },
      {
        name: 'Webcam Logitech C920',
        description: 'Webcam Full HD 1080p com microfone estéreo duplo, ajuste automático de luz e lentes de vidro HD.',
        price: 799.00,
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
        memory: 'N/A',
        storage: 'N/A',
        colors: ['Preto'],
        specifications: {
          'Resolução': '1080p Full HD',
          'Microfone': 'Estéreo Duplo',
          'Conexão': 'USB 2.0',
          'FPS': '30fps'
        }
      },
      {
        name: 'Apple Watch Series 9',
        description: 'Relógio inteligente Apple Watch Series 9 com GPS, tela sempre ligada, chip S9 SiP e recursos avançados de saúde e fitness.',
        price: 3499.00,
        image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400',
        memory: '64GB',
        storage: 'N/A',
        colors: ['Meia-Noite', 'Estrelado', 'Rosa', 'Vermelho', 'Azul'],
        specifications: {
          'Chip': 'S9 SiP',
          'Tela': 'Always-On Retina',
          'GPS': 'Incluído',
          'Bateria': 'Até 18 horas'
        }
      }
    ];

    const productsCollection = collection(this.firestore, 'products');
    const results = [];

    for (const product of products) {
      try {
        console.log(`Tentando adicionar produto: ${product.name}`);
        const docRef = await addDoc(productsCollection, product);
        results.push({ success: true, id: docRef.id, name: product.name });
        console.log(`✓ Produto adicionado com sucesso: ${product.name} (ID: ${docRef.id})`);
      } catch (error: any) {
        console.error(`✗ Erro ao adicionar ${product.name}:`, error);
        console.error('Detalhes do erro:', {
          code: error?.code,
          message: error?.message,
          stack: error?.stack
        });
        results.push({ 
          success: false, 
          name: product.name, 
          error: {
            code: error?.code,
            message: error?.message,
            fullError: error
          }
        });
      }
    }

    return results;
  }
}

