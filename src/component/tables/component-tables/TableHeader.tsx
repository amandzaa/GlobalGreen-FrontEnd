import { Info } from 'lucide-react';

interface TableHeaderProps {
  onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isAllSelected: boolean;
}

export function TableHeader({ onSelectAll, isAllSelected }: TableHeaderProps) {
  return (
    <div className="bg-[var(--color-paleGreen)] py-3 px-4 flex items-center border-b border-gray-200 sticky top-0 z-10">
      <div className="w-6 mr-2">
        <input 
          type="checkbox" 
          className="rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" 
          checked={isAllSelected}
          onChange={onSelectAll}
        />
      </div>
      <div className="w-2/5 text-sm font-medium text-gray-600">Product</div>
      <div className="w-1/12 text-sm font-medium text-gray-600 hidden sm:flex items-center">
        <span>Organic</span>
        <div className="relative group">
          <Info size={14} className="ml-1 text-gray-400 cursor-help" />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 w-48 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Certified organic products
          </div>
        </div>
      </div>
      <div className="w-1/12 text-sm font-medium text-gray-600 hidden md:block">
        Category
      </div>
      <div className="w-1/12 text-sm font-medium text-gray-600 flex items-center">
        <span>Discount</span>
        <div className="relative group">
          <Info size={14} className="ml-1 text-gray-400 cursor-help" />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 w-48 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Current discount percentage
          </div>
        </div>
      </div>
      <div className="w-1/8 text-sm font-medium text-gray-600">Price</div>
      <div className="w-1/12 text-sm font-medium text-gray-600 flex items-center">
        <span>Stock</span>
        <div className="relative group">
          <Info size={14} className="ml-1 text-gray-400 cursor-help" />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 w-48 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Available inventory quantity
          </div>
        </div>
      </div>
      <div className="w-1/6 text-sm font-medium text-gray-600 hidden lg:flex items-center">
        <span>Quality</span>
        <div className="relative group">
          <Info size={14} className="ml-1 text-gray-400 cursor-help" />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 w-48 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Product information completeness score
          </div>
        </div>
      </div>
      <div className="w-1/12 text-sm font-medium text-gray-600">Action</div>
    </div>
  );
}