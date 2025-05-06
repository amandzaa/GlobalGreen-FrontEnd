import { Edit, Package, Trash2 } from "lucide-react";
import { Product } from "./ProductTypes";

interface ProductRowProps {
  product: Product;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  animationDirection?: "next" | "prev";
  isAnimating?: boolean;
}

export function ProductRow({
  product,
  isSelected,
  onSelect,
  onDelete,
  animationDirection = "next",
  isAnimating = false,
}: ProductRowProps) {
  return (
    <div
      className="py-3 px-4 border-b border-gray-200 flex items-center hover:bg-[#F7FAF7]"
      style={{
        animation: isAnimating
          ? `${
              animationDirection === "next" ? "fadeInRight" : "fadeInLeft"
            } 0.4s ease-out`
          : "none",
      }}
    >
      <div className="w-6 mr-2">
        <input
          type="checkbox"
          className="rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
          checked={isSelected}
          onChange={() => onSelect(product.id)}
        />
      </div>
      <div className="w-2/5 flex">
        <div className="w-16 h-16 bg-[var(--color-secondary)] mr-3 overflow-hidden rounded">
          <div className="bg-[var(--color-secondary)] w-full h-full flex items-center justify-center text-[var(--color-darkGreen)]">
            <Package size={24} />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-[var(--color-darkGreen)]">{product.name}</h3>
          <div className="text-xs text-gray-500 mt-1">
            Parent SKU: {product.parentSku}
          </div>
          <div className="text-xs text-gray-500">
            Product ID: {product.productId}
          </div>
        </div>
      </div>
      <div className="w-1/12 text-sm">{product.sale}</div>
      <div className="w-1/8 text-sm">{product.price}</div>
      <div className="w-1/12 text-sm">{product.stock}</div>
      <div className="w-1/5">
        {product.status === "needImproved" && (
          <div className="text-sm text-[var(--color-darkGreen)]">Need to be Improved</div>
        )}
        {product.qualityInfo && (
          <div className="text-xs text-[var(--color-primary)] mt-1">
            {product.qualityInfo.message}
          </div>
        )}
      </div>
      <div className="w-1/12">
        <div className="flex flex-col gap-1">
          <button className="text-[var(--color-primary)] text-sm hover:text-[var(--color-darkGreen)] flex items-center">
            <Edit size={12} className="mr-1" /> Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="text-red-500 text-sm hover:text-red-700 flex items-center"
          >
            <Trash2 size={12} className="mr-1" /> Delete
          </button>
          <button className="text-[var(--color-primary)] text-sm hover:text-[var(--color-darkGreen)] flex items-center">
            <Package size={12} className="mr-1" /> Create Voucher
          </button>
        </div>
      </div>
    </div>
  );
}
