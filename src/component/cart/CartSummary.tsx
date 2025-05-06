import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { CreditCard, ShoppingBag, Gift, Info, AlertCircle } from 'lucide-react';
import { useVoucher } from '@/redux/hooks/useVoucher';
import { CartProduct } from '@/types/cart';

// Define props interface to receive selected items from parent
interface CartSummaryProps {
  selectedItems: CartProduct[];
}

const CartSummary: React.FC<CartSummaryProps> = ({ selectedItems }) => {
  const { loading } = useSelector((state: RootState) => state.cart);
  const { 
    voucherCode, 
    voucherError, 
    isApplyingVoucher, 
    handleApplyVoucher, 
    setVoucherCode, 
    setVoucherError,
    discount
  } = useVoucher(selectedItems);
  
  // Calculate subtotal for selected items only
  const subtotal = selectedItems.reduce((total, item) => total + item.total, 0);
  
  // Free shipping configuration
  const freeShippingThreshold = 50;
  const isFreeShippingEligible = subtotal - discount >= freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - (subtotal - discount));
  
  // Calculate tax (assuming 10% for example)
  const taxRate = 0.1;
  const tax = (subtotal - discount) * taxRate;
  
  // Calculate shipping cost
  const baseShippingCost = 4.99;
  const shipping = isFreeShippingEligible ? 0 : baseShippingCost;
  
  // Calculate total
  const total = subtotal - discount + tax + shipping;

  return (
    <div className="bg-[#E6F4EA] p-6 rounded-lg shadow-md sticky top-6">
      <h2 className="text-xl font-bold mb-6 text-[#20603D] flex items-center">
        <ShoppingBag className="w-5 h-5 mr-2" />
        Order Summary
        {selectedItems.length > 0 && (
          <span className="ml-2 bg-[#2E8B57] text-white text-xs font-bold rounded-full px-2 py-1">
            {selectedItems.length}
          </span>
        )}
      </h2>
      
      {selectedItems.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-yellow-700 mb-6">
          <h3 className="font-medium flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            No Items Selected
          </h3>
          <p className="mt-2 text-sm">
            Please select items from your cart to continue.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#20603D] mb-2">Payment Method</label>
            <div className="relative">
              <select 
                className="w-full p-3 border border-[#2E8B57] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#20603D] bg-white"
                defaultValue="Cash on Delivery"
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-[#20603D]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-5">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal ({selectedItems.length} items):</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center">
                  Discount:
                  <Gift className="w-4 h-4 ml-1 text-green-500" />
                </span>
                <span className="font-medium text-green-500">-${discount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-gray-600">Tax:</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 flex items-center">
                Shipping:
                {isFreeShippingEligible && (
                  <span className="ml-1 inline-flex bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">FREE</span>
                )}
              </span>
              <span className="font-medium">
                {isFreeShippingEligible ? (
                  <span className="text-green-500">$0.00</span>
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
              </span>
            </div>
          </div>
          
          {!isFreeShippingEligible && remainingForFreeShipping > 0 && (
            <div className="bg-[#87CEEB] bg-opacity-20 p-3 rounded-md mb-5 text-sm text-[#20603D] flex items-start">
              <Info className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> more to your cart to qualify for free shipping!</span>
            </div>
          )}
          
          <div className="mt-5 border-t border-[#2E8B57] pt-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-[#20603D]">Total:</span>
              <span className="font-bold text-lg text-[#20603D]">${total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="mt-5">
            <label className="block text-sm font-medium text-[#20603D] mb-2">Have a voucher?</label>
            <div className="flex">
              <input
                type="text"
                className={`w-full p-2 border ${voucherError ? 'border-red-500' : 'border-[#2E8B57]'} rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#20603D]`}
                placeholder="Enter code"
                value={voucherCode}
                onChange={(e) => {
                  setVoucherCode(e.target.value);
                  if (voucherError) setVoucherError('');
                }}
                disabled={isApplyingVoucher || loading}
              />
              <button
                onClick={handleApplyVoucher}
                disabled={isApplyingVoucher || loading || selectedItems.length === 0}
                className="bg-[#2E8B57] text-white px-4 py-2 rounded-r-lg hover:bg-[#20603D] transition-colors disabled:opacity-50"
              >
                {isApplyingVoucher ? 'Applying...' : 'Apply'}
              </button>
            </div>
            {voucherError && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {voucherError}
              </p>
            )}
          </div>

          {discount > 0 && (
            <div className="mt-3 bg-green-50 border border-green-200 rounded p-2 text-sm text-green-700 flex items-center">
              <Gift className="w-4 h-4 mr-2" />
              Voucher applied successfully! You saved ${discount.toFixed(2)}
            </div>
          )}
          
          <button 
            className="w-full mt-6 bg-[#20603D] hover:bg-[#20603D]/80 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedItems.length === 0 || loading}
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Checkout ({selectedItems.length} items)
          </button>

          <div className="mt-4 text-xs text-gray-500 text-center">
            <p>By proceeding, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSummary;