import { Edit, Package, Trash2 } from "lucide-react";
import { Product } from "./ProductTypes";

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ProductCard({
  product,
  isSelected,
  onSelect,
  onDelete,
}: ProductCardProps) {
  return (
    <div className="border border-gray-200 rounded-md p-3 hover:shadow-md">
      <div className="flex items-center justify-between mb-2">
        <input
          type="checkbox"
          className="rounded border-gray-300 text-[#2E8B57] focus:ring-[#2E8B57]"
          checked={isSelected}
          onChange={() => onSelect(product.id)}
        />
        <div className="flex gap-2">
          <button className="text-[#2E8B57] hover:text-[#20603D]" title="Edit">
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="text-red-500 hover:text-red-700"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
          <button
            className="text-[#2E8B57] hover:text-[#20603D]"
            title="Create Voucher"
          >
            <Package size={16} />
          </button>
        </div>
      </div>

      <div className="bg-[#87CEEB] w-full h-40 mb-2 rounded flex items-center justify-center text-[#20603D]">
        <Package size={36} />
      </div>
      <h3 className="text-sm font-medium text-[#20603D] mb-1">
        {product.name}
      </h3>
      <div className="text-xs text-gray-500">ID: {product.productId}</div>
      <div className="flex justify-between items-center mt-2">
        <div className="text-sm font-medium">{product.price}</div>
        <div className="text-xs text-gray-500">Stock: {product.stock}</div>
      </div>
    </div>
  );
}
