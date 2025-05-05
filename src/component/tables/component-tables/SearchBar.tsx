import { ChangeEvent } from 'react';
import { Grid, Info, List, Trash2 } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  viewMode: 'list' | 'grid';
  onViewModeChange: (mode: 'list' | 'grid') => void;
  selectedCount: number;
  onBulkDelete: () => void;
}

export function SearchBar({
  searchTerm,
  onSearch,
  viewMode,
  onViewModeChange,
  selectedCount,
  onBulkDelete
}: SearchBarProps) {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <div className="text-sm text-gray-700">
        Products 
        <span className="text-gray-500 text-xs ml-2">
          Max. Product Limit: 2000 <Info size={14} className="inline-block text-gray-400" />
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Bulk Delete Button */}
        {selectedCount > 0 && (
          <button
            onClick={onBulkDelete}
            className="bg-red-50 text-red-600 border border-red-200 rounded-md px-3 py-1 text-sm hover:bg-red-100 flex items-center"
          >
            <Trash2 size={14} className="mr-1" />
            Delete Selected ({selectedCount})
          </button>
        )}
        
        {/* Search input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={onSearch}
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
            onClick={() => onViewModeChange('list')} 
            className={`p-1 ${viewMode === 'list' ? 'text-[#2E8B57]' : 'text-gray-400'}`}
          >
            <List size={18} />
          </button>
          <button 
            onClick={() => onViewModeChange('grid')} 
            className={`p-1 ${viewMode === 'grid' ? 'text-[#2E8B57]' : 'text-gray-400'}`}
          >
            <Grid size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}