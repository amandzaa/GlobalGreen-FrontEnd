import React, { createContext, useContext, useState, ReactNode } from 'react';

type WishlistContextType = {
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isWishlisted: (productId: number) => boolean;
};

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  toggleWishlist: () => {},
  isWishlisted: () => false,
});

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const toggleWishlist = (productId: number) => {
    setWishlist(wishlist =>
      wishlist.includes(productId)
        ? wishlist.filter(id => id !== productId)
        : [...wishlist, productId]
    );
  };
  const isWishlisted = (productId: number) => wishlist.includes(productId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};
