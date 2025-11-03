export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  colors?: string[]; // Cores disponíveis
  memory?: string; // Memória RAM
  storage?: string; // Capacidade de armazenamento
  specifications?: { // Especificações adicionais
    [key: string]: string;
  };
}
