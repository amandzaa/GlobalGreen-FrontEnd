import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { colors } from "@/types";

// Define TypeScript interfaces for the props
interface Product {
  id: string;
  image: string;
  name: string;
  variant: string;
  price: string;
  quantity: number;
  total: string;
  status: string;
  countdown?: string;
  delivery: string;
  orderDate: string;
}

interface OrdersTableProps {
  products: Product[];
  defaultItemsPerPage?: number;
  title?: string;
  subtitle?: string;
}

export default function OrdersTable({ 
  products, 
  defaultItemsPerPage = 5,
  title = "Recent Orders",
  subtitle = "Track your orders and their status"
}: OrdersTableProps) {
  // State variables
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(defaultItemsPerPage);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev'>('next');
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.variant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  // Update visible products when pagination, search or itemsPerPage changes
  useEffect(() => {
    const handlePageTransition = async () => {
      setIsAnimating(true);
      
      // Small delay to allow animation to start
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Set visible products after animation started
      setVisibleProducts(currentProducts);
      
      // End animation after transition time
      setTimeout(() => {
        setIsAnimating(false);
      }, 350);
    };
    
    handlePageTransition();
  }, [currentPage, itemsPerPage, searchTerm, JSON.stringify(filteredProducts)]);

  // Handle page changes
  const goToPage = (pageNumber: number) => {
    const newPage = Math.max(1, Math.min(pageNumber, totalPages));
    
    if (newPage === currentPage) return;
    
    // Set animation direction based on navigation
    setAnimationDirection(newPage > currentPage ? 'next' : 'prev');
    setCurrentPage(newPage);
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentProducts.map(product => product.id));
    }
    setAllSelected(!allSelected);
  };

  // Handle individual row selection
  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
      if (allSelected) setAllSelected(false);
    } else {
      setSelectedRows([...selectedRows, id]);
      if (selectedRows.length + 1 === currentProducts.length) {
        setAllSelected(true);
      }
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Set animation to "prev" for a reset to the beginning
    setAnimationDirection('prev');
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-3 md:space-y-0">
        <div>
          <h2 className="text-xl font-bold" style={{ color: colors.darkGreen }}>{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders"
              value={searchTerm}
              onChange={handleSearchChange}
              className="border rounded-md pl-8 pr-2 py-2 text-sm w-full"
              style={{ borderColor: colors.primary, color: colors.darkGreen }}
            />
            <svg
              className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke={colors.primary}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <select 
            className="border rounded-md px-2 py-2 text-sm"
            style={{ borderColor: colors.primary, color: colors.darkGreen }}
          >
            <option>All statuses</option>
            <option>To be sent</option>
            <option>In transit</option>
            <option>Delivered</option>
          </select>
        </div>
      </div>

      {/* Responsive Table with Animation */}
      <div className="overflow-x-auto">
        <div className="relative min-h-[300px]">
          <div className="bg-gray-50 py-3 px-4 rounded flex items-center border border-gray-200 sticky top-0 z-10" style={{ backgroundColor: colors.lightGray }}>
            <div className="w-12 text-sm font-medium text-gray-600">
              <input 
                type="checkbox" 
                className="rounded" 
                checked={allSelected}
                onChange={handleSelectAll}
              />
            </div>
            <div className="w-2/5 text-sm font-medium text-gray-600">
              Product
            </div>
            <div className="w-1/6 text-sm font-medium text-gray-600 hidden sm:block">
              Price
            </div>
            <div className="w-1/6 text-sm font-medium text-gray-600">
              Status
            </div>
            <div className="w-1/6 text-sm font-medium text-gray-600 hidden md:block">
              Delivery
            </div>
            <div className="w-1/6 text-sm font-medium text-gray-600">
              Action
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {products.length > 0 ? (
              visibleProducts.map((product) => (
                <div
                  key={product.id}
                  className="py-4 px-4 flex items-center hover:bg-gray-50 transition-all duration-300"
                  style={{
                    animation: isAnimating 
                      ? `${animationDirection === 'next' ? 'fadeInRight' : 'fadeInLeft'} 0.4s ease-out` 
                      : 'none'
                  }}
                >
                  <div className="w-12">
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={selectedRows.includes(product.id)}
                      onChange={() => handleSelectRow(product.id)}
                    />
                  </div>
                  <div className="w-2/5 flex items-center gap-3">
                    <div className="h-16 w-16 bg-gray-100 rounded flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover rounded"
                      />
                    </div>
                    <div>
                      <h3
                        className="font-medium"
                        style={{ color: colors.darkGreen }}
                      >
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {product.variant}
                      </p>
                      <p className="text-xs text-gray-400">
                        Order #{product.id} • {product.orderDate}
                      </p>
                    </div>
                  </div>
                  <div className="w-1/6 hidden sm:block">
                    <p className="font-medium">{product.total}</p>
                    <p className="text-xs text-gray-500">
                      {product.quantity} items
                    </p>
                  </div>
                  <div className="w-1/6">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor:
                          product.status === "To be sent"
                            ? "rgba(46, 139, 87, 0.1)"
                            : "rgba(135, 206, 235, 0.2)",
                        color:
                          product.status === "To be sent"
                            ? colors.primary
                            : "#3b82f6",
                      }}
                    >
                      {product.status}
                    </span>
                  </div>
                  <div className="w-1/6 hidden md:block">
                    <p className="text-sm">{product.delivery}</p>
                    {product.countdown && (
                      <p className="text-xs text-gray-500">
                        Time left: {product.countdown}
                      </p>
                    )}
                  </div>
                  <div className="w-1/6 flex justify-end md:justify-start">
                    <button
                      className="px-3 py-1 text-xs rounded transition-all hover:opacity-80"
                      style={{
                        backgroundColor: colors.primary,
                        color: "white",
                      }}
                    >
                      Process
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FileText size={32} className="text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm mb-1">
                  No recent orders found. Use the Export feature to find old
                  orders.
                </p>
              </div>
            )}
            
            {/* Loading indicator */}
            {isAnimating && (
              <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-t-2 border-gray-500 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
      
      {/* Enhanced Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-3 sm:space-y-0">
        <div className="text-sm text-gray-500">
          {filteredProducts.length > 0 ? (
            <>
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} items
              {filteredProducts.length < products.length && ` (filtered from ${products.length})`}
            </>
          ) : (
            <>No results found</>
          )}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-1">
          <button 
            onClick={() => goToPage(1)} 
            disabled={currentPage === 1 || isAnimating}
            className="bg-white border rounded-md px-3 py-1 text-sm text-gray-500 disabled:opacity-50 hover:bg-gray-50 transition-colors duration-200"
            aria-label="First page"
          >
            <span className="sr-only">First</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => goToPage(currentPage - 1)} 
            disabled={currentPage === 1 || isAnimating}
            className="bg-white border rounded-md px-3 py-1 text-sm text-gray-500 disabled:opacity-50 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center">
              {isAnimating && animationDirection === 'prev' ? (
                <div className="w-4 h-4 mr-1">
                  <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : null}
              Previous
            </div>
          </button>
          
          {/* Page numbers */}
          <div className="hidden sm:flex">
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              if (pageNum > 0 && pageNum <= totalPages) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    disabled={isAnimating}
                    className={`mx-1 px-3 py-1 rounded-md text-sm transition-all duration-200 ${
                      currentPage === pageNum
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-white border text-gray-500 hover:bg-gray-50 hover:border-blue-300'
                    } ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {pageNum}
                  </button>
                );
              }
              return null;
            })}
          </div>
          
          <button 
            onClick={() => goToPage(currentPage + 1)} 
            disabled={currentPage === totalPages || totalPages === 0 || isAnimating}
            className="bg-white border rounded-md px-3 py-1 text-sm text-gray-500 disabled:opacity-50 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center">
              Next
              {isAnimating && animationDirection === 'next' ? (
                <div className="w-4 h-4 ml-1">
                  <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : null}
            </div>
          </button>
          <button 
            onClick={() => goToPage(totalPages)} 
            disabled={currentPage === totalPages || totalPages === 0 || isAnimating}
            className="bg-white border rounded-md px-3 py-1 text-sm text-gray-500 disabled:opacity-50 hover:bg-gray-50 transition-colors duration-200"
            aria-label="Last page"
          >
            <span className="sr-only">Last</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Items per page selector */}
        <div className="hidden md:block">
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setAnimationDirection('prev'); // Treat as going back to start
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded-md px-2 py-1 text-sm transition-colors duration-200 hover:border-blue-400"
            style={{ borderColor: colors.primary, color: colors.darkGreen }}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={15}>15 per page</option>
            <option value={25}>25 per page</option>
          </select>
        </div>
      </div>
    </div>
  );
}