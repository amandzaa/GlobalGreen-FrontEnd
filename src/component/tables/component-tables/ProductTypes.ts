export interface Product {
    id: string;
    name: string;
    parentSku: string;
    productId: string;
    image: string;
    sale: number;
    price: string;
    stock: number;
    status: string;
    qualityInfo?: {
      message: string;
      level: 'warning' | 'error' | 'info';
    };
  }