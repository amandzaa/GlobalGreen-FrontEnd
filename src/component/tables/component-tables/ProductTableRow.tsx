import { Pencil, Trash2, Eye } from "lucide-react";

interface ProductRowProps {
  product: {
    product_id: number;
    name: string;
    description: string;
    price: number;
    stock_quantity: number;
    category_id: number;
    organic: boolean;
    unit_type: string;
    discount: number | null;
    images: {
      image_url: string;
      alt_text: string;
    }[];
  };
  isSelected: boolean;
  onSelect: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
  categories: { [key: number]: string }; // Map of category_id to category name
  qualityScore: number; // Calculate this based on product completeness
}

export function ProductTableRow({
  product,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onView,
  categories,
  qualityScore
}: ProductRowProps) {
  // Calculate discount price if applicable
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : null;

  // Calculate quality score (you can implement your own logic)
  // For example: check if product has images, description, etc.

  return (
    <div className="py-4 px-4 flex items-center hover:bg-gray-50 transition-all duration-300 border-b border-gray-100">
      <div className="w-6 mr-2">
        <input
          type="checkbox"
          className="rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
          checked={isSelected}
          onChange={() => onSelect(product.product_id)}
        />
      </div>
      
      {/* Product column */}
      <div className="w-2/5 flex items-center gap-3">
        <div className="h-16 w-16 bg-gray-100 rounded flex-shrink-0">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0].image_url}
              alt={product.images[0].alt_text || product.name}
              className="h-full w-full object-cover rounded"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gray-200 rounded">
              <span className="text-gray-400 text-xs">No image</span>
            </div>
          )}
        </div>
        <div>
          <h3 className="font-medium text-gray-800">{product.name}</h3>
          <p className="text-xs text-gray-500 truncate max-w-xs">
            {product.description.length > 60
              ? `${product.description.substring(0, 60)}...`
              : product.description}
          </p>
          <p className="text-xs text-gray-400">
            ID: {product.product_id} • {product.unit_type}
          </p>
        </div>
      </div>
      
      {/* Organic status */}
      <div className="w-1/12 hidden sm:block">
        {product.organic ? (
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
            Organic
          </span>
        ) : (
          <span className="text-gray-400 text-xs">—</span>
        )}
      </div>
      
      {/* Category */}
      <div className="w-1/12 hidden md:block">
        <span className="text-sm text-gray-700">
          {categories[product.category_id] || "—"}
        </span>
      </div>
      
      {/* Discount */}
      <div className="w-1/12">
        {product.discount ? (
          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
            {product.discount}%
          </span>
        ) : (
          <span className="text-gray-400 text-xs">—</span>
        )}
      </div>
      
      {/* Price */}
      <div className="w-1/8">
        <p className="font-medium text-gray-800">
          ${product.price.toFixed(2)}
        </p>
        {discountedPrice && (
          <p className="text-xs text-red-600">
            ${discountedPrice.toFixed(2)}
          </p>
        )}
      </div>
      
      {/* Stock */}
      <div className="w-1/12">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.stock_quantity > 10
              ? "bg-green-100 text-green-800"
              : product.stock_quantity > 0
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {product.stock_quantity}
        </span>
      </div>
      
      {/* Quality score */}
      <div className="w-1/6 hidden lg:block">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-[var(--color-primary)] h-2 rounded-full"
            style={{ width: `${qualityScore}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-500 mt-1">
          {qualityScore}%
        </span>
      </div>
      
      {/* Actions */}
      <div className="w-1/12 flex space-x-2">
        <button
          onClick={() => onView(product.product_id)}
          className="p-1 text-gray-500 hover:text-[var(--color-primary)] transition-colors"
          title="View Product"
        >
          <Eye size={16} />
        </button>
        <button
          onClick={() => onEdit(product.product_id)}
          className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
          title="Edit Product"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => onDelete(product.product_id)}
          className="p-1 text-gray-500 hover:text-red-600 transition-colors"
          title="Delete Product"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}