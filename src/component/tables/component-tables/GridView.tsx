import { Product } from './ProductTypes';
import { ProductCard } from './ProductCard';

interface GridViewProps {
  products: Product[];
  selectedProducts: string[];
  onSelectProduct: (id: string) => void;
  onDeleteProduct: (id: string) => void;
  isAnimating: boolean;
//   animationDirection: 'next' | 'prev';
  gridColumns: string;
}

export function GridView({
  products,
  selectedProducts,
  onSelectProduct,
  onDeleteProduct,
  isAnimating,
//   animationDirection,
  gridColumns
}: GridViewProps) {
  return (
    <div 
      className={`${gridColumns} gap-4 p-4`}
      style={{ opacity: isAnimating ? 0.6 : 1, transition: 'opacity 0.3s' }}
    >
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isSelected={selectedProducts.includes(product.id)}
            onSelect={onSelectProduct}
            onDelete={onDeleteProduct}
          />
        ))
      ) : (
        <div className="col-span-full py-10 text-center text-gray-500">
          No products found matching your search.
        </div>
      )}
    </div>
  );
}