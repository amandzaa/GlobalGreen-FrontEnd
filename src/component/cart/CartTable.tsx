import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { 
  removeFromCart, 
  updateQuantity,
  incrementQuantity,
  decrementQuantity
} from '@/redux/features/cart/cartSlice';
import { CartProduct } from '@/types/cart';
import CartItem from './CartItem';

// Define interface for component props
interface CartTableProps {
  onSelectedItemsChange: (selectedItems: CartProduct[]) => void;
  maxQuantity?: number; // Optional max quantity per item
  isLoading?: boolean; // Added for checkout loading state
}

const CartTable: React.FC<CartTableProps> = ({ 
  onSelectedItemsChange,
  maxQuantity = 99, // Default max quantity
  isLoading = false
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.cart);
  
  // State for selected items, loading states, and confirmation modals
  const [selectedItemIds, setSelectedItemIds] = useState<Record<string, boolean>>({});
  const [selectAll, setSelectAll] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  
  // Check window size for responsive design
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // Memoize selected items for performance
  const selectedItems = useMemo(() => {
    return items.filter(item => selectedItemIds[item.id]);
  }, [items, selectedItemIds]);
  
  // Call the parent's callback when selected items change
  useEffect(() => {
    onSelectedItemsChange(selectedItems);
  }, [selectedItems, onSelectedItemsChange]);
  
  // Initialize all items as selected when items load
  useEffect(() => {
    if (items.length > 0) {
      const initialSelectedItemIds: Record<string, boolean> = {};
      items.forEach(item => {
        initialSelectedItemIds[item.id] = true;
      });
      setSelectedItemIds(initialSelectedItemIds);
      setSelectAll(true);
    } else {
      setSelectedItemIds({});
      setSelectAll(false);
    }
  }, [items.length]);
  
  // Memoized select all handler
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
      
      const allSelected = items.every(item => newSelectedItemIds[item.id]);
      setSelectAll(allSelected);
      
      return newSelectedItemIds;
    });
  }, [items]);
  
  // Handle removing an item from cart
  const handleRemoveItem = useCallback((itemId: string) => {
    setItemToRemove(itemId);
  }, []);

  // Confirm removal of item
  const confirmRemoveItem = useCallback(() => {
    if (itemToRemove) {
      dispatch(removeFromCart(itemToRemove));
      // Also update the selection state
      setSelectedItemIds(prev => {
        const newSelectedItemIds = { ...prev };
        delete newSelectedItemIds[itemToRemove];
        return newSelectedItemIds;
      });
      setItemToRemove(null);
    }
  }, [dispatch, itemToRemove]);

  // Cancel removal
  const cancelRemoveItem = useCallback(() => {
    setItemToRemove(null);
  }, []);

  // Handle updating item quantity with validation
  const handleUpdateQuantity = useCallback((itemId: string, newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= maxQuantity) {
      dispatch(updateQuantity({ productId: itemId, quantity: newQuantity }));
    } else if (newQuantity > maxQuantity) {
      dispatch(updateQuantity({ productId: itemId, quantity: maxQuantity }));
      // You could also add toast notification here
    }
  }, [dispatch, maxQuantity]);

  // Optimized increment and decrement handlers
  const handleIncrementQuantity = useCallback((itemId: string) => {
    const item = items.find(item => item.id === itemId);
    if (item && item.quantity < maxQuantity) {
      dispatch(incrementQuantity(itemId));
    }
  }, [dispatch, items, maxQuantity]);

  const handleDecrementQuantity = useCallback((itemId: string) => {
    const item = items.find(item => item.id === itemId);
    if (item && item.quantity > 1) {
      dispatch(decrementQuantity(itemId));
    }
  }, [dispatch, items]);
  
  // Handle processing selected items
//   const handleProcessSelected = useCallback(() => {
//     if (selectedItems.length === 0) {
//       alert('Please select at least one item to process');
//       return;
//     }
    
//     // Implement actual processing logic here
//     console.log('Processing items:', selectedItems);
//   }, [selectedItems]);
  
  const handleClearCart = useCallback(() => {
    if (window.confirm('Are you sure you want to clear selected items from your cart?')) {
      // Remove selected items from cart
      selectedItems.forEach(item => {
        dispatch(removeFromCart(item.id));
      });
      setSelectedItemIds({});
      setSelectAll(false);
    }
  }, [dispatch, selectedItems]);
  
  // Calculate subtotals for the table's footer
  const selectedSubtotal = useMemo(() => {
    return selectedItems.reduce((total, item) => total + item.total, 0);
  }, [selectedItems]);
  
  const allItemsSubtotal = useMemo(() => {
    return items.reduce((total, item) => total + item.total, 0);
  }, [items]);

  // Render mobile view for small screens
  const renderMobileView = () => {
    return (
      <div className="divide-y divide-[#E6F4EA]">
        {loading ? (
          <div className="p-8 text-center">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#20603D]"></div>
              <span className="ml-2 text-[#20603D]">Loading cart...</span>
            </div>
          </div>
        ) : items.length > 0 ? (
          items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              isSelected={!!selectedItemIds[item.id]}
              onSelect={handleSelectItem}
              onRemove={handleRemoveItem}
              onUpdateQuantity={handleUpdateQuantity}
              onIncrement={handleIncrementQuantity}
              onDecrement={handleDecrementQuantity}
              maxQuantity={maxQuantity}
              isLoading={loading || isLoading}
              isSmallScreen={true}
            />
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            <div className="flex flex-col items-center">
              <ShoppingCart className="h-12 w-12 text-[#2E8B57] mb-2" />
              <p className="mb-4">Your shopping cart is empty</p>
              <Link href="/consumer-productpage" className="bg-[#2E8B57] text-white px-4 py-2 rounded hover:bg-[#20603D] transition-colors">
                <span className="flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render desktop table view
  const renderDesktopView = () => {
    return (
      <>
        <table className="min-w-full divide-y divide-[#2E8B57]" aria-label="Shopping cart items">
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
                    aria-label="Select all items"
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
                <CartItem
                  key={item.id}
                  item={item}
                  isSelected={!!selectedItemIds[item.id]}
                  onSelect={handleSelectItem}
                  onRemove={handleRemoveItem}
                  onUpdateQuantity={handleUpdateQuantity}
                  onIncrement={handleIncrementQuantity}
                  onDecrement={handleDecrementQuantity}
                  maxQuantity={maxQuantity}
                  isLoading={loading || isLoading}
                  isSmallScreen={false}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <ShoppingCart className="h-12 w-12 text-[#2E8B57] mb-2" />
                    <p className="mb-4">Your shopping cart is empty</p>
                    <Link href="/consumer-productpage" className="bg-[#2E8B57] text-white px-4 py-2 rounded hover:bg-[#20603D] transition-colors">
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
          
          <tfoot className="bg-[#E6F4EA]">
            {items.length > 0 && (
              <>
                <tr>
                  <td colSpan={4} className="px-4 py-2 text-right font-medium text-[#20603D]">
                    Selected items ({selectedItems.length}/{items.length}):
                  </td>
                  <td className="px-4 py-2 text-center font-bold text-[#20603D]">
                    Rp{selectedSubtotal.toFixed(2)}
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td colSpan={4} className="px-4 py-2 text-right font-medium text-[#20603D]">
                    All items subtotal:
                  </td>
                  <td className="px-4 py-2 text-center font-bold text-[#20603D]">
                    Rp{allItemsSubtotal.toFixed(2)}
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td colSpan={4} className="px-4 py-2 text-right text-sm text-[#20603D]">
                    Estimated shipping:
                  </td>
                  <td className="px-4 py-2 text-center text-sm font-medium text-[#20603D]">
                    {selectedSubtotal >= 50 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      'Rp4.99'
                    )}
                  </td>
                  <td></td>
                </tr>
                <tr className="border-t-2 border-[#2E8B57]">
                  <td colSpan={4} className="px-4 py-3 text-right font-bold text-lg text-[#20603D]">
                    Selected total:
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-lg text-[#20603D]">
                    Rp{selectedSubtotal >= 50 ? selectedSubtotal.toFixed(2) : (selectedSubtotal + 4.99).toFixed(2)}
                  </td>
                  <td></td>
                </tr>
                {selectedSubtotal < 50 && selectedSubtotal > 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-2 text-center text-sm bg-[#87CEEB] bg-opacity-20 text-[#20603D]">
                      Add Rp{(50 - selectedSubtotal).toFixed(2)} more to qualify for free shipping!
                    </td>
                  </tr>
                )}
              </>
            )}
          </tfoot>
        </table>

        <div className="p-4 flex flex-col sm:flex-row gap-3 justify-between bg-white border-t border-[#E6F4EA]">
          <Link href="/consumer-productpage" className="flex items-center px-4 py-2 rounded-full text-white bg-[#2E8B57] hover:bg-[#20603D] transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Continue Shopping
          </Link>
        
        </div>

        {items.length > 0 && (
          <div className="p-3 bg-[#E6F4EA] text-xs text-center text-[#20603D] border-t border-[#2E8B57]/20">
            <p>Free shipping on orders over Rp50000. 30-day return policy. Select items you wish to checkout.</p>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="bg-[#E6F4EA] overflow-hidden rounded-lg shadow-md">
      <div className="p-4 flex items-center justify-between bg-[#20603D] text-white">
        <h2 className="text-lg font-semibold flex items-center">
          <ShoppingCart className="mr-2" /> Shopping Cart
          {items.length > 0 && <span className="ml-2 bg-[#2E8B57] text-white text-xs font-bold rounded-full px-2 py-1">{items.length}</span>}
        </h2>
        <div className="flex space-x-2">
          {items.length > 0 && (
            <>
              <button 
                onClick={handleClearCart}
                disabled={loading || selectedItems.length === 0}
                className="flex items-center text-sm bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition-colors disabled:opacity-50"
                aria-label="Clear selected items"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                {loading ? 'Clearing...' : 'Clear Selected'}
              </button>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 border-b border-red-200" role="alert">
          Error loading cart: {error}
        </div>
      )}

      <div className="overflow-x-auto">
        {isSmallScreen ? renderMobileView() : renderDesktopView()}
      </div>

      {/* Confirmation modal for item removal */}
      {itemToRemove && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" role="dialog" aria-modal="true">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Remove Item</h3>
            <p className="mb-6">Are you sure you want to remove this item from your cart?</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={cancelRemoveItem}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={confirmRemoveItem}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartTable;