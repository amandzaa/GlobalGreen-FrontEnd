// File: @/redux/hooks/useVoucher.ts

import { useState, useCallback } from 'react';
import { CartProduct } from '@/types/cart';

export const useVoucher = (selectedItems: CartProduct[]) => {
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherError, setVoucherError] = useState('');
  const [isApplyingVoucher, setIsApplyingVoucher] = useState(false);
  const [discount, setDiscount] = useState(0);
  
  // Mock voucher codes for demonstration
  const validVouchers = {
    'SAVE10': { type: 'percentage', value: 10 },
    'SAVE20': { type: 'percentage', value: 20 },
    'FIXED15': { type: 'fixed', value: 15 },
    'WELCOME': { type: 'percentage', value: 15 }
  };
  
  const handleApplyVoucher = useCallback(() => {
    if (!voucherCode.trim()) {
      setVoucherError('Please enter a voucher code');
      return;
    }
    
    if (selectedItems.length === 0) {
      setVoucherError('Please select items to apply voucher');
      return;
    }
    
    setIsApplyingVoucher(true);
    
    // Simulate API call
    setTimeout(() => {
      const code = voucherCode.toUpperCase();
      const voucher = validVouchers[code as keyof typeof validVouchers];
      
      if (!voucher) {
        setVoucherError('Invalid voucher code');
        setDiscount(0);
      } else {
        // Calculate discount based on voucher type
        const subtotal = selectedItems.reduce((total, item) => total + item.total, 0);
        let discountAmount;
        
        if (voucher.type === 'percentage') {
          discountAmount = (subtotal * voucher.value) / 100;
        } else {
          discountAmount = Math.min(voucher.value, subtotal);
        }
        
        setDiscount(discountAmount);
        setVoucherError('');
      }
      
      setIsApplyingVoucher(false);
    }, 500);
  }, [voucherCode, selectedItems]);
  
  return {
    voucherCode,
    voucherError,
    isApplyingVoucher,
    handleApplyVoucher,
    setVoucherCode,
    setVoucherError,
    discount
  };
};

export default useVoucher;