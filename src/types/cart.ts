 
  export interface ApplyVoucherPayload {
    code: string;
  }

  export interface CartProduct {
    id: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
    image?: string;
    color?: string;
    size?: string;
  }
  
  export interface CartState {
    items: CartProduct[];
    loading: boolean;
    error: string | null;
  }
  
  export interface UpdateQuantityPayload {
    productId: string;
    quantity: number;
  }