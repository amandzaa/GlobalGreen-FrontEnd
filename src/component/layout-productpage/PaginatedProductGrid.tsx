import React, { useState, useEffect } from 'react';
import ProductCard from '@/component/layout-productpage/ProductCard';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  rating: number;
  ratingCount: number;
  label?: string;
  unit_type?: string; // Added unit_type property
}

interface PaginatedProductGridProps {
  products: Product[];
  productsPerPage?: number;
  title?: string;
  gridClassName?: string; // Added prop for custom grid layouts
}

const PaginatedProductGrid: React.FC<PaginatedProductGridProps> = ({
  products,
  productsPerPage = 6,
  title = "YOU MIGHT LIKE",
  gridClassName // Optional class for controlling grid layout
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right, 0 for initial
  const [isAnimating, setIsAnimating] = useState(false);
  
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Calculate visible page numbers
  const getVisiblePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are less than or equal to max visible pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end of visible pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust start and end to always show 3 pages if possible
      if (end - start < 2) {
        if (start === 2) {
          end = Math.min(totalPages - 1, start + 2);
        } else if (end === totalPages - 1) {
          start = Math.max(2, end - 2);
        }
      }
      
      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push("...");
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push("...");
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  useEffect(() => {
    // Get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    setPaginatedProducts(products.slice(indexOfFirstProduct, indexOfLastProduct));
  }, [currentPage, products, productsPerPage]);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages && !isAnimating) {
      // Set animation direction
      setDirection(pageNumber > currentPage ? 1 : -1);
      
      // Prevent multiple clicks during animation
      setIsAnimating(true);
      
      // Change page after a slight delay to allow exit animation
      setTimeout(() => {
        setCurrentPage(pageNumber);
        
        // Scroll to top of product grid with smooth behavior
        window.scrollTo({
          top: document.getElementById('product-grid')?.offsetTop || 0,
          behavior: 'smooth'
        });
        
        // Reset animation state after completion
        setTimeout(() => {
          setIsAnimating(false);
        }, 500);
      }, 200);
    }
  };

  // Dynamically calculate grid columns based on products per page
  // Limit to maximum 4 products per row
  const getGridClasses = () => {
    if (gridClassName) {
      return gridClassName; // Use custom grid class if provided
    }
    
    // Default responsive grid based on productsPerPage
    switch (productsPerPage) {
      case 1:
        return "grid grid-cols-1 gap-4";
      case 2:
        return "grid grid-cols-1 sm:grid-cols-2 gap-4";
      case 3:
        return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4";
      case 4:
        return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4";
      case 5:
      case 6:
      case 7:
      case 8:
        // For 5+ products per page, still limit to 4 columns max
        return "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";
      default:
        return "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";
    }
  };

  // Global green color palette
  const colors = {
    primary: '#2E8B57',    // Medium green
    secondary: '#87CEEB',  // Light blue
    light: '#E6F4EA',      // Very light cream
    dark: '#20603D',       // Dark green
    accent: '#3875B5',     // Button blue
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg text-gray-600 mb-2">{title}</h2>
      </div>

      {/* Product grid with animations */}
      <div id="product-grid" className="relative overflow-hidden mb-6 pb-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentPage}
            initial={{ 
              opacity: 0,
              x: direction * 20 
            }}
            animate={{ 
              opacity: 1,
              x: 0,
              transition: { 
                opacity: { duration: 0.5 },
                x: { type: "spring", stiffness: 300, damping: 30 }
              }
            }}
            exit={{ 
              opacity: 0,
              x: direction * -20,
              transition: { 
                opacity: { duration: 0.3 }
              }
            }}
            className={getGridClasses()}
          >
            {paginatedProducts.map(product => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: 0.1 + (parseInt(product.id) % Math.max(productsPerPage, 1)) * 0.05,
                    duration: 0.4,
                    ease: "easeOut"
                  }
                }}
                className={productsPerPage === 1 ? "max-w-md mx-auto w-full" : ""}
              >
                <ProductCard 
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  image={product.image}
                  rating={product.rating}
                  ratingCount={product.ratingCount}
                  label={product.label}
                  unit_type={product.unit_type}
                  // Apply custom sizing for single product view
                  className={productsPerPage === 1 ? "w-full h-full" : ""}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination with animations */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center my-8">
          <motion.button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isAnimating}
            className={`flex items-center p-2 ${
              currentPage === 1 || isAnimating ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:text-green-600'
            }`}
            style={{ color: currentPage !== 1 && !isAnimating ? colors.primary : undefined }}
            whileHover={currentPage !== 1 && !isAnimating ? { scale: 1.05 } : {}}
            whileTap={currentPage !== 1 && !isAnimating ? { scale: 0.95 } : {}}
            transition={{ duration: 0.2 }}
            aria-label="Previous page"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="ml-1">Previous</span>
          </motion.button>

          <div className="flex mx-2 space-x-1">
            {getVisiblePageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === "..." ? (
                  <span className="px-3 py-1 text-gray-600">...</span>
                ) : (
                  <motion.button
                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === page
                        ? 'text-white font-bold'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                    style={{ 
                      backgroundColor: currentPage === page ? colors.dark : undefined,
                    }}
                    disabled={isAnimating}
                    whileHover={currentPage !== page && !isAnimating ? { 
                      scale: 1.1, 
                      backgroundColor: colors.primary, 
                      color: '#ffffff' 
                    } : {}}
                    whileTap={currentPage !== page && !isAnimating ? { scale: 0.95 } : {}}
                    transition={{ duration: 0.2 }}
                    animate={currentPage === page ? {
                      scale: [1, 1.15, 1],
                      transition: { duration: 0.4 }
                    } : {}}
                  >
                    {page}
                  </motion.button>
                )}
              </React.Fragment>
            ))}
          </div>

          <motion.button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isAnimating}
            className={`flex items-center p-2 ${
              currentPage === totalPages || isAnimating ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:text-green-600'
            }`}
            style={{ color: currentPage !== totalPages && !isAnimating ? colors.primary : undefined }}
            whileHover={currentPage !== totalPages && !isAnimating ? { scale: 1.05 } : {}}
            whileTap={currentPage !== totalPages && !isAnimating ? { scale: 0.95 } : {}}
            transition={{ duration: 0.2 }}
            aria-label="Next page"
          >
            <span className="mr-1">Next</span>
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default PaginatedProductGrid;