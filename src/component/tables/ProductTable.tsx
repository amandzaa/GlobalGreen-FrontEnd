import { useState, useEffect } from 'react';
import { Info, Package, List, Grid } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  parentSku: string;
  productId: string;
  image: string;
  sale: number;
  price: string;
  stock: number;
  status: string;
  qualityInfo?: {
    message: string;
    level: 'warning' | 'error' | 'info';
  };
}

interface ProductTableProps {
  products: Product[];
  itemsPerPage?: number;
}

export default function ProductTable({ products, itemsPerPage = 5 }: ProductTableProps) {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev'>('next');
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage);
  
  // Determine grid columns based on itemsPerPage
  const getGridColumns = (itemsCount: number): string => {
    if (itemsCount <= 5) return 'grid-cols-1 md:grid-cols-1';
    if (itemsCount <= 10) return 'grid-cols-1 md:grid-cols-2';
    if (itemsCount <= 15) return 'grid-cols-1 md:grid-cols-3';
    return 'grid-cols-2 md:grid-cols-4';
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.parentSku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.productId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPageState);
  const startIndex = (currentPage - 1) * itemsPerPageState;
  const endIndex = startIndex + itemsPerPageState;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  
  // Calculate grid columns based on current items per page
  const gridColumns = getGridColumns(itemsPerPageState);
  
  // Update visible products with animation
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
    // Dependency on stringified filtered products to avoid reference issues
  }, [currentPage, itemsPerPageState, searchTerm, JSON.stringify(filteredProducts)]);
  
  // Handle page navigation
  const goToPage = (pageNumber: number) => {
    const newPage = Math.max(1, Math.min(pageNumber, totalPages));
    
    if (newPage === currentPage) return;
    
    // Set animation direction based on navigation
    setAnimationDirection(newPage > currentPage ? 'next' : 'prev');
    setCurrentPage(newPage);
  };
  
  // Handle checkbox selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProducts(visibleProducts.map(product => product.id));
    } else {
      setSelectedProducts([]);
    }
  };
  
  const handleSelectProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(productId => productId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };
  
  // Check if all visible products are selected
  const isAllSelected = visibleProducts.length > 0 && 
    visibleProducts.every(product => selectedProducts.includes(product.id));

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnimationDirection('prev');
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };
  
  // Sample products for demo if empty
  const demoProducts: Product[] = [
    {
        id: '1',
        name: 'Premium Laptop Pro',
        parentSku: 'LAP-PRO-17',
        productId: 'LP17001',
        image: '',
        sale: 189,
        price: '$1499.99',
        stock: 32,
        status: 'active'
      },
      {
        id: '2',
        name: 'Wireless Noise-Cancelling Headphones',
        parentSku: 'AUDIO-WH-200',
        productId: 'AWH20022',
        image: '',
        sale: 327,
        price: '$179.99',
        stock: 85,
        status: 'active'
      },
      {
        id: '3',
        name: 'Smart Watch Series X',
        parentSku: 'WATCH-SMX-44',
        productId: 'WSX4433',
        image: '',
        sale: 251,
        price: '$299.99',
        stock: 41,
        status: 'needImproved',
        qualityInfo: {
          message: 'Missing technical specifications',
          level: 'warning'
        }
      }
    ];
  
  // Use demo products if none provided
  const displayProducts = products.length > 0 ? products : demoProducts;
  
  return (
    <div className="bg-white rounded-md border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="text-sm text-gray-700">
          {filteredProducts.length} Products 
          <span className="text-gray-500 text-xs ml-2">
            Max. Product Limit: 2000 <Info size={14} className="inline-block text-gray-400" />
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border rounded-md pl-8 pr-2 py-1 text-sm w-full"
            />
            <svg
              className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
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
          
          {/* View mode toggles */}
          <div className="flex gap-2">
            <button 
              onClick={() => setViewMode('list')} 
              className={`p-1 ${viewMode === 'list' ? 'text-[#2E8B57]' : 'text-gray-400'}`}
            >
              <List size={18} />
            </button>
            <button 
              onClick={() => setViewMode('grid')} 
              className={`p-1 ${viewMode === 'grid' ? 'text-[#2E8B57]' : 'text-gray-400'}`}
            >
              <Grid size={18} />
            </button>
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

      {viewMode === 'list' ? (
        <div className="relative min-h-[300px]">
          {/* List View */}
          <div className="bg-[#E6F4EA] py-2 px-4 flex items-center border-b border-gray-200">
            <div className="w-6 mr-2">
              <input 
                type="checkbox" 
                className="rounded border-gray-300 text-[#2E8B57] focus:ring-[#2E8B57]" 
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
            </div>
            <div className="w-2/5 text-sm font-medium text-gray-600">Product</div>
            <div className="w-1/12 text-sm font-medium text-gray-600 flex items-center">
              Sale <Info size={14} className="ml-1 text-gray-400" />
            </div>
            <div className="w-1/8 text-sm font-medium text-gray-600">Price</div>
            <div className="w-1/12 text-sm font-medium text-gray-600 flex items-center">
              Stock <Info size={14} className="ml-1 text-gray-400" />
            </div>
            <div className="w-1/5 text-sm font-medium text-gray-600 flex items-center">
              Product Information Quality <Info size={14} className="ml-1 text-gray-400" />
            </div>
            <div className="w-1/12 text-sm font-medium text-gray-600">Action</div>
          </div>

          {/* Products with animation */}
          <div className="relative overflow-hidden">
            {visibleProducts.length > 0 ? (
              visibleProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="py-3 px-4 border-b border-gray-200 flex items-center hover:bg-[#F7FAF7]"
                  style={{
                    animation: isAnimating 
                      ? `${animationDirection === 'next' ? 'fadeInRight' : 'fadeInLeft'} 0.4s ease-out` 
                      : 'none'
                  }}
                >
                  <div className="w-6 mr-2">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-[#2E8B57] focus:ring-[#2E8B57]" 
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                    />
                  </div>
                  <div className="w-2/5 flex">
                    <div className="w-16 h-16 bg-[#87CEEB] mr-3 overflow-hidden rounded">
                      <div className="bg-[#87CEEB] w-full h-full flex items-center justify-center text-[#20603D]">
                        <Package size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-[#20603D]">{product.name}</h3>
                      <div className="text-xs text-gray-500 mt-1">Parent SKU: {product.parentSku}</div>
                      <div className="text-xs text-gray-500">Product ID: {product.productId}</div>
                    </div>
                  </div>
                  <div className="w-1/12 text-sm">{product.sale}</div>
                  <div className="w-1/8 text-sm">{product.price}</div>
                  <div className="w-1/12 text-sm">{product.stock}</div>
                  <div className="w-1/5">
                    {product.status === 'needImproved' && (
                      <div className="text-sm text-[#20603D]">Need to be Improved</div>
                    )}
                    {product.qualityInfo && (
                      <div className="text-xs text-[#2E8B57] mt-1">
                        {product.qualityInfo.message}
                      </div>
                    )}
                  </div>
                  <div className="w-1/12">
                    <div className="flex flex-col gap-1">
                      <button className="text-[#2E8B57] text-sm hover:text-[#20603D]">Change</button>
                      <button className="text-[#2E8B57] text-sm hover:text-[#20603D]">Advertise</button>
                      <button className="text-[#2E8B57] text-sm hover:text-[#20603D]">Other</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-gray-500">
                No products found matching your search.
              </div>
            )}
          </div>
          
          {/* Loading spinner during transitions */}
          {isAnimating && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-30 z-10">
              <div className="w-8 h-8 border-4 border-t-[#2E8B57] border-[#E6F4EA] rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      ) : (
        <div className="relative min-h-[300px]">
          {/* Grid View with dynamic columns based on itemsPerPage */}
          <div 
            className={`${gridColumns} gap-4 p-4`}
            style={{ opacity: isAnimating ? 0.6 : 1, transition: 'opacity 0.3s' }}
          >
            {visibleProducts.length > 0 ? (
              visibleProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="border border-gray-200 rounded-md p-3 hover:shadow-md"
                  style={{
                    animation: isAnimating 
                      ? `${animationDirection === 'next' ? 'fadeInRight' : 'fadeInLeft'} 0.4s ease-out` 
                      : 'none'
                  }}
                >
                  <div className="bg-[#87CEEB] w-full h-40 mb-2 rounded flex items-center justify-center text-[#20603D]">
                    <Package size={36} />
                  </div>
                  <h3 className="text-sm font-medium text-[#20603D] mb-1">{product.name}</h3>
                  <div className="text-xs text-gray-500">ID: {product.productId}</div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm font-medium">{product.price}</div>
                    <div className="text-xs text-gray-500">Stock: {product.stock}</div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button className="text-xs text-[#2E8B57] hover:text-[#20603D]">Edit</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-10 text-center text-gray-500">
                No products found matching your search.
              </div>
            )}
          </div>
          
          {/* Loading spinner during transitions */}
          {isAnimating && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-30 z-10">
              <div className="w-8 h-8 border-4 border-t-[#2E8B57] border-[#E6F4EA] rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      )}
      
      {/* Enhanced Pagination */}
      {totalPages > 0 && (
        <div className="px-4 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 gap-2">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
            {filteredProducts.length < displayProducts.length && ` (filtered from ${displayProducts.length})`}
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-1">
            {/* First page button */}
            <button 
              onClick={() => goToPage(1)} 
              disabled={currentPage === 1 || isAnimating}
              className="bg-white border rounded-md p-2 text-sm text-gray-500 disabled:opacity-50 hover:bg-gray-50"
              aria-label="First page"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Previous button */}
            <button 
              onClick={() => goToPage(currentPage - 1)} 
              disabled={currentPage === 1 || isAnimating}
              className="bg-white border rounded-md px-3 py-1 text-sm text-gray-500 disabled:opacity-50 hover:bg-[#F7FAF7]"
            >
              <div className="flex items-center">
                {isAnimating && animationDirection === 'prev' ? (
                  <div className="w-4 h-4 mr-1">
                    <svg className="animate-spin h-4 w-4 text-[#2E8B57]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                      className={`mx-1 px-3 py-1 rounded-md text-sm transition-colors duration-200 ${
                        currentPage === pageNum
                          ? 'bg-[#2E8B57] text-white shadow-md'
                          : 'bg-white border text-gray-600 hover:bg-[#F7FAF7] hover:border-[#2E8B57]'
                      } ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                return null;
              })}
            </div>
            
            {/* Next button */}
            <button 
              onClick={() => goToPage(currentPage + 1)} 
              disabled={currentPage === totalPages || totalPages === 0 || isAnimating}
              className="bg-white border rounded-md px-3 py-1 text-sm text-gray-500 disabled:opacity-50 hover:bg-[#F7FAF7]"
            >
              <div className="flex items-center">
                Next
                {isAnimating && animationDirection === 'next' ? (
                  <div className="w-4 h-4 ml-1">
                    <svg className="animate-spin h-4 w-4 text-[#2E8B57]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                ) : null}
              </div>
            </button>
            
            {/* Last page button */}
            <button 
              onClick={() => goToPage(totalPages)} 
              disabled={currentPage === totalPages || totalPages === 0 || isAnimating}
              className="bg-white border rounded-md p-2 text-sm text-gray-500 disabled:opacity-50 hover:bg-gray-50"
              aria-label="Last page"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Items per page selector */}
          <div className="hidden md:block">
            <select
              value={itemsPerPageState}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setAnimationDirection('prev');
                setItemsPerPageState(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded-md px-2 py-1 text-sm transition-colors duration-200 hover:border-[#2E8B57] text-gray-600"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={15}>15 per page</option>
              <option value={25}>25 per page</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}