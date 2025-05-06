import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Trash2, Check } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { 
  fetchCart, 
  removeFromCart, 
  updateQuantity,
  incrementQuantity,
  decrementQuantity
} from '@/redux/features/cart/cartSlice';
import { CartProduct } from '@/types/cart';

// Define interface for component props
interface CartTableProps {
  onSelectedItemsChange: (selectedItems: CartProduct[]) => void;
}

const CartTable: React.FC<CartTableProps> = ({ onSelectedItemsChange }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.cart);
  
  const [selectedItemIds, setSelectedItemIds] = useState<Record<string, boolean>>({});
  const [selectAll, setSelectAll] = useState(false);
  
  // Calculate the selected items
  const selectedItems = items.filter(item => selectedItemIds[item.id]);
  
  // Call the parent's callback when selected items change
  useEffect(() => {
    onSelectedItemsChange(selectedItems);
  }, [selectedItems, onSelectedItemsChange]);
  
  // Memoized select all handler to prevent unnecessary re-renders
  const handleSelectAll = useCallback(() => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    
    const newSelectedItemIds: Record<string, boolean> = {};
    items.forEach(item => {
      newSelectedItemIds[item.id] = newSelectAll;
    });
    setSelectedItemIds(newSelectedItemIds);
  }, [selectAll, items]);
  
  // Memoized item selection handler
  const handleSelectItem = useCallback((itemId: string) => {
    setSelectedItemIds(prev => {
      const newSelectedItemIds = {
        ...prev,
        [itemId]: !prev[itemId]
      };
      
      // Update selectAll state based on if all items are selected
      setSelectAll(items.every(item => newSelectedItemIds[item.id]));
      
      return newSelectedItemIds;
    });
  }, [items]);
  
  // Handle removing an item from cart
  const handleRemoveItem = useCallback((itemId: string) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      dispatch(removeFromCart(itemId));
      // Also update the selection state
      setSelectedItemIds(prev => {
        const newSelectedItemIds = { ...prev };
        delete newSelectedItemIds[itemId];
        return newSelectedItemIds;
      });
    }
  }, [dispatch]);

  // Handle updating item quantity
  const handleUpdateQuantity = useCallback((itemId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ productId: itemId, quantity: newQuantity }));
    }
  }, [dispatch]);

  // Optimized increment and decrement handlers
  const handleIncrementQuantity = useCallback((itemId: string) => {
    dispatch(incrementQuantity(itemId));
  }, [dispatch]);

  const handleDecrementQuantity = useCallback((itemId: string) => {
    const item = items.find(item => item.id === itemId);
    if (item && item.quantity > 1) {
      dispatch(decrementQuantity(itemId));
    }
  }, [dispatch, items]);
  
  // Handle processing selected items
  const handleProcessSelected = useCallback(() => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item to process');
      return;
    }
    
    // Implement actual processing logic here
    console.log('Processing items:', selectedItems);
  }, [selectedItems]);
  
  const handleClearCart = useCallback(() => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      // Implement cart clearing logic
      selectedItems.forEach(item => {
        dispatch(removeFromCart(item.id));
      });
      setSelectedItemIds({});
      setSelectAll(false);
    }
  }, [dispatch, selectedItems]);
  
  // Initialize all items as selected when items load
  useEffect(() => {
    if (items.length > 0) {
      const initialSelectedItemIds: Record<string, boolean> = {};
      items.forEach(item => {
        initialSelectedItemIds[item.id] = true;
      });
      setSelectedItemIds(initialSelectedItemIds);
      setSelectAll(true);
    }
  }, [items]);
  
  // Calculate subtotal for the table's footer
  const selectedSubtotal = selectedItems.reduce((total, item) => total + item.total, 0);
  const allItemsSubtotal = items.reduce((total, item) => total + item.total, 0);

  return (
    <div className="bg-[#E6F4EA] overflow-x-auto rounded-lg shadow-md">
      <div className="p-4 flex items-center justify-between bg-[#20603D] text-white">
        <h2 className="text-lg font-semibold flex items-center">
          <ShoppingCart className="mr-2" /> Shopping Cart
          {items.length > 0 && <span className="ml-2 bg-[#2E8B57] text-white text-xs font-bold rounded-full px-2 py-1">{items.length}</span>}
        </h2>
        <div className="flex space-x-2">
          {items.length > 0 && (
            <>
              <button
                onClick={handleProcessSelected}
                disabled={loading || selectedItems.length === 0}
                className="flex items-center text-sm bg-[#87CEEB] hover:bg-blue-500 px-3 py-1 rounded transition-colors disabled:opacity-50"
              >
                <Check className="h-4 w-4 mr-1" />
                {loading ? 'Processing...' : 'Process Selected'}
              </button>
              <button 
                onClick={handleClearCart}
                disabled={loading || selectedItems.length === 0}
                className="flex items-center text-sm bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition-colors disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                {loading ? 'Clearing...' : 'Clear Selected'}
              </button>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 border-b border-red-200">
          Error loading cart: {error}
        </div>
      )}

      <table className="min-w-full divide-y divide-[#2E8B57]">
        <thead className="bg-[#2E8B57] text-white">
          <tr>
            <th scope="col" className="px-3 py-3 text-center w-10">
              <div className="flex justify-center items-center">
                <input
                  type="checkbox"
                  checked={selectAll && items.length > 0}
                  onChange={handleSelectAll}
                  disabled={items.length === 0 || loading}
                  className="w-4 h-4 accent-[#20603D] cursor-pointer"
                  title="Select all items"
                />
              </div>
            </th>
            <th scope="col" className="px-3 py-3 text-left text-sm font-medium">Product</th>
            <th scope="col" className="px-3 py-3 text-center text-sm font-medium">Price</th>
            <th scope="col" className="px-3 py-3 text-center text-sm font-medium">Quantity</th>
            <th scope="col" className="px-3 py-3 text-center text-sm font-medium">Total</th>
            <th scope="col" className="px-3 py-3 text-center text-sm font-medium">Actions</th>
          </tr>
        </thead>
        
        <tbody className="bg-white divide-y divide-[#E6F4EA]">
          {loading ? (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center">
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#20603D]"></div>
                  <span className="ml-2 text-[#20603D]">Loading cart...</span>
                </div>
              </td>
            </tr>
          ) : items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id} className={selectedItemIds[item.id] ? 'bg-[#E6F4EA]/30' : ''}>
                <td className="px-3 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={!!selectedItemIds[item.id]}
                    onChange={() => handleSelectItem(item.id)}
                    className="w-4 h-4 accent-[#20603D] cursor-pointer"
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
                <td className="px-3 py-4 text-center">${item.price.toFixed(2)}</td>
                <td className="px-3 py-4">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => handleDecrementQuantity(item.id)}
                      disabled={item.quantity <= 1 || loading}
                      className="bg-[#E6F4EA] p-1 rounded-l border border-[#2E8B57] disabled:opacity-50"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                      className="w-12 text-center border-t border-b border-[#2E8B57] py-1"
                    />
                    <button
                      onClick={() => handleIncrementQuantity(item.id)}
                      disabled={loading}
                      className="bg-[#E6F4EA] p-1 rounded-r border border-[#2E8B57] disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-3 py-4 text-center font-medium">${item.total.toFixed(2)}</td>
                <td className="px-3 py-4 text-center">
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={loading}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Remove item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                <div className="flex flex-col items-center">
                  <ShoppingCart className="h-12 w-12 text-[#2E8B57] mb-2" />
                  <p className="mb-4">Your shopping cart is empty</p>
                  <Link href="/products" className="bg-[#2E8B57] text-white px-4 py-2 rounded hover:bg-[#20603D] transition-colors">
                    <span className="flex items-center">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Continue Shopping
                    </span>
                  </Link>
                </div>
              </td>
            </tr>
          )}
        </tbody>
        
        {items.length > 0 && (
          <tfoot className="bg-[#E6F4EA]">
            <tr>
              <td colSpan={4} className="px-4 py-3 text-right font-medium text-[#20603D]">
                Selected Subtotal:
              </td>
              <td className="px-3 py-3 text-center font-bold text-[#20603D]">
                ${selectedSubtotal.toFixed(2)}
              </td>
              <td></td>
            </tr>
            <tr>
              <td colSpan={4} className="px-4 py-3 text-right text-sm text-gray-600">
                All Items Subtotal:
              </td>
              <td className="px-3 py-3 text-center text-sm text-gray-600">
                ${allItemsSubtotal.toFixed(2)}
              </td>
              <td></td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default CartTable;