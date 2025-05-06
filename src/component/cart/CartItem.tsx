import React from 'react';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

// Define the CartProduct type to ensure consistency
export type CartProduct = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  color?: string;
  size?: string;
  image?: string;
};

type CartItemProps = {
  item: CartProduct;
  onRemove?: (id: string) => void;
  onQuantityChange?: (id: string, quantity: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onQuantityChange }) => {
  return (
    <div className="flex items-center py-2 w-full">
      <div className="w-16 h-16 flex-shrink-0 mr-4 bg-gray-100 rounded overflow-hidden">
        {item.image ? (
          <Image 
            src={item.image} 
            alt={item.name} 
            width={64} 
            height={64} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>
      
      <div className="flex-grow grid grid-cols-5 gap-2">
        <div className="col-span-2">
          <h3 className="font-medium text-[#20603D]">{item.name}</h3>
          <div className="flex items-center mt-1 text-sm text-gray-500">
            {item.color && <span className="mr-4">Color: {item.color}</span>}
            {item.size && <span>Size: {item.size}</span>}
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          <span className="font-medium">${item.price.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            {onQuantityChange ? (
              <>
                <button 
                  onClick={() => item.quantity > 1 && onQuantityChange(item.id, item.quantity - 1)} 
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l hover:bg-gray-100"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={item.quantity} 
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value > 0) {
                      onQuantityChange(item.id, value);
                    }
                  }}
                  className="w-10 h-8 text-center border-t border-b border-gray-300"
                  min="1"
                />
                <button 
                  onClick={() => onQuantityChange(item.id, item.quantity + 1)} 
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r hover:bg-gray-100"
                >
                  +
                </button>
              </>
            ) : (
              <span>{item.quantity}</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="font-bold text-[#20603D]">${item.total.toFixed(2)}</span>
          
          {onRemove && (
            <button 
              onClick={() => onRemove(item.id)} 
              className="p-1 text-red-500 hover:text-red-700 transition-colors"
              aria-label="Remove item"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;