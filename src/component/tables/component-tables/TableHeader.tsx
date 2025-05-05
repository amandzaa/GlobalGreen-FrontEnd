import { Info } from 'lucide-react';

interface TableHeaderProps {
  onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isAllSelected: boolean;
}

export function TableHeader({ onSelectAll, isAllSelected }: TableHeaderProps) {
  return (
    <div className="bg-[var(--color-paleGreen)] py-2 px-4 flex items-center border-b border-gray-200">
      <div className="w-6 mr-2">
        <input 
          type="checkbox" 
          className="rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" 
          checked={isAllSelected}
          onChange={onSelectAll}
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
  );
}