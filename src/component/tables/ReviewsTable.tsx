import { useState, useEffect } from 'react';

// Define types for our data
export interface Review {
  id: number;
  product: string;
  customer: string;
  customerInitial: string;
  rating: number;
  review: string;
  status: "approved" | "pending";
  time: string;
}

export interface ReviewsTableProps {
  reviews?: Review[];
  defaultItemsPerPage?: number;
  colors?: {
    darkGreen?: string;
    mediumGreen?: string;
    lightGreen?: string;
    buttonBlue?: string;
    lightBlue?: string;
  };
  title?: string;
  subtitle?: string;
}

export default function ReviewsTable({
  reviews = [],
  defaultItemsPerPage = 6,
  colors = {
    darkGreen: "#1C4532",
    mediumGreen: "#2F7C31",
    lightGreen: "#DCFCE7",
    buttonBlue: "#3B82F6",
    lightBlue: "#93C5FD"
  },
  title = "Latest reviews",
  subtitle = "Payment received across all channels"
}: ReviewsTableProps) {
  // State variables with proper types
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(defaultItemsPerPage);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev'>('next');
  const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);

  // Filter reviews based on search term
  const filteredReviews = reviews.filter(review => 
    review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.review.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  
  // Fix: Only update visible reviews when pagination, search or itemsPerPage changes
  useEffect(() => {
    const handlePageTransition = async () => {
      setIsAnimating(true);
      
      // Small delay to allow animation to start
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Set visible reviews after animation started
      setVisibleReviews(currentReviews);
      
      // End animation after transition time
      setTimeout(() => {
        setIsAnimating(false);
      }, 350);
    };
    
    handlePageTransition();
    // Only depend on these variables, not on currentReviews
  }, [currentPage, itemsPerPage, searchTerm, JSON.stringify(filteredReviews)]);

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
      setSelectedRows(currentReviews.map(review => review.id));
    }
    setAllSelected(!allSelected);
  };

  // Handle individual row selection
  const handleSelectRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
      if (allSelected) setAllSelected(false);
    } else {
      setSelectedRows([...selectedRows, id]);
      if (selectedRows.length + 1 === currentReviews.length) {
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

  // Render star ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i}
            className="w-4 h-4"
            fill={i < rating ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            ></path>
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-3 md:space-y-0">
        <div>
          <h2 className="text-xl font-bold" style={{ color: colors.darkGreen }}>{title}</h2>
          <p className="text-sm" style={{ color: colors.mediumGreen }}>{subtitle}</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="border rounded-md pl-8 pr-2 py-1 text-sm w-full"
              style={{ borderColor: colors.mediumGreen, color: colors.darkGreen }}
            />
            <svg
              className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke={colors.mediumGreen}
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
            className="border rounded-md px-2 py-1 text-sm"
            style={{ borderColor: colors.mediumGreen, color: colors.darkGreen }}
          >
            <option>All products</option>
            {Array.from(new Set(reviews.map(review => review.product))).map(product => (
              <option key={product}>{product}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Responsive Table with Animation */}
      <div className="overflow-x-auto">
        <div className="relative min-h-[300px]">
          <table className="min-w-full divide-y" style={{ borderColor: `${colors.mediumGreen}30` }}>
            <thead className="bg-white sticky top-0 z-10">
              <tr className="border-b" style={{ borderColor: `${colors.mediumGreen}30` }}>
                <th className="w-4 py-3">
                  <input 
                    type="checkbox" 
                    className="rounded" 
                    checked={allSelected}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="text-left font-medium text-sm py-3 px-2" style={{ color: colors.darkGreen }}>PRODUCT</th>
                <th className="text-left font-medium text-sm py-3 px-2 hidden md:table-cell" style={{ color: colors.darkGreen }}>CUSTOMER</th>
                <th className="text-left font-medium text-sm py-3 px-2 hidden sm:table-cell" style={{ color: colors.darkGreen }}>RATING</th>
                <th className="text-left font-medium text-sm py-3 px-2" style={{ color: colors.darkGreen }}>REVIEW</th>
                <th className="text-left font-medium text-sm py-3 px-2 hidden lg:table-cell" style={{ color: colors.darkGreen }}>STATUS</th>
                <th className="text-left font-medium text-sm py-3 px-2 hidden xl:table-cell" style={{ color: colors.darkGreen }}>TIME</th>
                <th className="w-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y relative" style={{ borderColor: `${colors.mediumGreen}20` }}>
              {visibleReviews && visibleReviews.length > 0 ? (
                visibleReviews.map((review) => (
                  <tr 
                    key={review.id} 
                    className={`hover:bg-gray-50 transition-all duration-300`}
                    style={{
                      animation: isAnimating 
                        ? `${animationDirection === 'next' ? 'fadeInRight' : 'fadeInLeft'} 0.4s ease-out` 
                        : 'none'
                    }}
                  >
                    <td className="py-4 px-2">
                      <input 
                        type="checkbox" 
                        className="rounded" 
                        checked={selectedRows.includes(review.id)}
                        onChange={() => handleSelectRow(review.id)}
                      />
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-md mr-2 flex-shrink-0"></div>
                        <span className="text-sm" style={{ color: colors.buttonBlue }}>{review.product}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 hidden md:table-cell">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2 flex-shrink-0" style={{ backgroundColor: `${colors.lightBlue}50` }}>
                          <span style={{ color: colors.mediumGreen, fontWeight: 500 }}>{review.customerInitial}</span>
                        </div>
                        <span className="text-sm" style={{ color: colors.darkGreen }}>{review.customer}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 hidden sm:table-cell">
                      {renderStars(review.rating)}
                    </td>
                    <td className="py-4 px-2">
                      <p className="text-sm truncate max-w-xs">{review.review}</p>
                    </td>
                    <td className="py-4 px-2 hidden lg:table-cell">
                      <span 
                        className={`text-xs px-3 py-1 rounded-md ${
                          review.status === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {review.status === 'approved' ? 'APPROVED' : 'PENDING'}
                      </span>
                    </td>
                    <td className="py-4 px-2 hidden xl:table-cell">
                      <span className="text-sm text-gray-500">{review.time}</span>
                    </td>
                    <td className="py-4 px-2">
                      <button className="focus:outline-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          ></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-4 text-center text-gray-500">
                    No reviews found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          {isAnimating && (
            <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-t-2 border-gray-500 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
      
      {/* CSS for animations - using Next.js global styles approach */}
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
          {filteredReviews.length > 0 ? (
            <>
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredReviews.length)} of {filteredReviews.length} items
              {filteredReviews.length < reviews.length && ` (filtered from ${reviews.length})`}
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
            style={{ borderColor: colors.mediumGreen, color: colors.darkGreen }}
          >
            <option value={6}>6 per page</option>
            <option value={10}>10 per page</option>
            <option value={15}>15 per page</option>
            <option value={25}>25 per page</option>
          </select>
        </div>
      </div>
    </div>
  );
}