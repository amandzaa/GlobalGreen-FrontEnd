import React, { memo } from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { CartProduct } from '@/types/cart';

// Define props interface for the component
interface CartItemProps {
  item: CartProduct;
  isSelected: boolean;
  onSelect: (itemId: string) => void;
  onRemove: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onIncrement: (itemId: string) => void;
  onDecrement: (itemId: string) => void;
  maxQuantity: number;
  isLoading: boolean;
  isSmallScreen: boolean;
}

const CartItem: React.FC<CartItemProps> = memo(({
  item,
  isSelected,
  onSelect,
  onRemove,
  onUpdateQuantity,
  onIncrement,
  onDecrement,
  maxQuantity,
  isLoading,
  isSmallScreen
}) => {
  // Render different layouts based on screen size
  if (isSmallScreen) {
    return (
      <div className={`p-4 ${isSelected ? 'bg-[#E6F4EA]/30' : 'bg-white'}`}>
        <div className="flex items-start">
          <div className="mt-1">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect(item.id)}
              className="w-4 h-4 accent-[#20603D] cursor-pointer"
              aria-label={`Select ${item.name}`}
            />
          </div>
          <div className="ml-3 flex-grow">
            <div className="flex items-start">
              {item.image && (
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-3 rounded" />
              )}
              <div className="flex-grow">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                {item.color && (
                  <div className="text-sm text-gray-500">
                    Color: <span className="font-medium">{item.color}</span>
                  </div>
                )}
                {item.size && (
                  <div className="text-sm text-gray-500">
                    Size: <span className="font-medium">{item.size}</span>
                  </div>
                )}
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <div className="text-sm text-gray-500">Price: <span className="font-medium">Rp{item.price.toFixed(2)}</span></div>
                    <div className="text-sm font-medium mt-1">Total: <span className="text-[#20603D]">Rp{item.total.toFixed(2)}</span></div>
                  </div>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor={`quantity-${item.id}`} className="block text-sm text-gray-500 mb-1">Quantity:</label>
              <div className="flex items-center">
                <button
                  onClick={() => onDecrement(item.id)}
                  disabled={item.quantity <= 1 || isLoading}
                  className="bg-[#E6F4EA] p-1 rounded-l border border-[#2E8B57] disabled:opacity-50"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input
                  id={`quantity-${item.id}`}
                  type="number"
                  min="1"
                  max={maxQuantity}
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                  className="w-12 text-center border-t border-b border-[#2E8B57] py-1"
                  aria-label={`Quantity for ${item.name}`}
                />
                <button
                  onClick={() => onIncrement(item.id)}
                  disabled={isLoading || item.quantity >= maxQuantity}
                  className="bg-[#E6F4EA] p-1 rounded-r border border-[#2E8B57] disabled:opacity-50"
                  aria-label="Increase quantity"
                >
                  +
                </button>
                {item.quantity >= maxQuantity && (
                  <span className="ml-2 text-xs text-amber-600 flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" /> Max quantity
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop view (table row)
  return (
    <tr className={isSelected ? 'bg-[#E6F4EA]/30' : ''}>
      <td className="px-3 py-4 text-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(item.id)}
          className="w-4 h-4 accent-[#20603D] cursor-pointer"
          aria-label={`Select ${item.name}`}
        />
      </td>
      <td className="px-3 py-4">
        <div className="flex items-center">
          {item.image && (
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4 rounded" />
          )}
          <div>
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            {item.color && (
              <div className="text-sm text-gray-500">
                Color: <span className="font-medium">{item.color}</span>
              </div>
            )}
            {item.size && (
              <div className="text-sm text-gray-500">
                Size: <span className="font-medium">{item.size}</span>
              </div>
            )}
          </div>
        </div>
      </td>
      <td className="px-3 py-4 text-center">Rp{item.price.toFixed(2)}</td>
      <td className="px-3 py-4">
        <div className="flex items-center justify-center">
          <button
            onClick={() => onDecrement(item.id)}
            disabled={item.quantity <= 1 || isLoading}
            className="bg-[#E6F4EA] p-1 rounded-l border border-[#2E8B57] disabled:opacity-50"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            max={maxQuantity}
            value={item.quantity}
            onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
            className="w-12 text-center border-t border-b border-[#2E8B57] py-1"
            aria-label={`Quantity for ${item.name}`}
          />
          <button
            onClick={() => onIncrement(item.id)}
            disabled={isLoading || item.quantity >= maxQuantity}
            className="bg-[#E6F4EA] p-1 rounded-r border border-[#2E8B57] disabled:opacity-50"
            aria-label="Increase quantity"
          >
            +
          </button>
          {item.quantity >= maxQuantity && (
            <span className="ml-2 text-xs text-amber-600 flex items-center">
              <AlertTriangle className="w-3 h-3 mr-1" /> Max
            </span>
          )}
        </div>
      </td>
      <td className="px-3 py-4 text-center font-medium">Rp{item.total.toFixed(2)}</td>
      <td className="px-3 py-4 text-center">
        <button 
          onClick={() => onRemove(item.id)}
          disabled={isLoading}
          className="text-red-500 hover:text-red-700 p-1"
          aria-label={`Remove ${item.name} from cart`}
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
});

CartItem.displayName = 'CartItem';

export default CartItem;