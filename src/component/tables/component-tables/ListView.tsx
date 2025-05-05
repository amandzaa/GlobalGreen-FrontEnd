import { Product } from './ProductTypes';
import { TableHeader } from './TableHeader';
import { ProductRow } from './ProductRow';

interface ListViewProps {
  products: Product[];
  selectedProducts: string[];
  onSelectProduct: (id: string) => void;
  onDeleteProduct: (id: string) => void;
  onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isAllSelected: boolean;
  isAnimating: boolean;
  animationDirection: 'next' | 'prev';
}

export function ListView({
  products,
  selectedProducts,
  onSelectProduct,
  onDeleteProduct,
  onSelectAll,
  isAllSelected,
  isAnimating,
  animationDirection
}: ListViewProps) {
  return (
    <div className="relative min-h-[300px]">
      <TableHeader onSelectAll={onSelectAll} isAllSelected={isAllSelected} />

      <div className="relative overflow-hidden">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              isSelected={selectedProducts.includes(product.id)}
              onSelect={onSelectProduct}
              onDelete={onDeleteProduct}
              isAnimating={isAnimating}
              animationDirection={animationDirection}
            />
          ))
        ) : (
          <div className="py-10 text-center text-gray-500">
            No products found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}