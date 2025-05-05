import { useState } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  filteredTotal: number;
  itemsPerPage: number;
  isAnimating: boolean;
  animationDirection: 'next' | 'prev';
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (count: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  filteredTotal,
  itemsPerPage,
  isAnimating,
  animationDirection,
  onPageChange,
  onItemsPerPageChange
}: PaginationProps) {
  return (
    <div className="px-4 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 gap-2">
      <div className="text-sm text-gray-500">
        Showing {startIndex + 1} to {Math.min(endIndex, filteredTotal)} of {filteredTotal} products
        {filteredTotal < totalItems && ` (filtered from ${totalItems})`}
      </div>
      
      <div className="flex flex-wrap justify-center items-center gap-1">
        {/* First page button */}
        <button 
          onClick={() => onPageChange(1)} 
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
          onClick={() => onPageChange(currentPage - 1)} 
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
                  onClick={() => onPageChange(pageNum)}
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
          onClick={() => onPageChange(currentPage + 1)} 
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
          onClick={() => onPageChange(totalPages)} 
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
          value={itemsPerPage}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            onItemsPerPageChange(Number(e.target.value));
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
  );
}