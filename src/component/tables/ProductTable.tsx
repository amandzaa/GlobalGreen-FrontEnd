import { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import { Product } from './component-tables/ProductTypes';
import { SearchBar } from './component-tables/SearchBar';
import { ListView } from './component-tables/ListView';
import { GridView } from './component-tables/GridView';
import { Pagination } from './component-tables/Pagination';
import { DeleteModal } from './component-tables/DeleteModal';
import { AnimationStyles } from './component-tables/AnimationStyles';
import { LoadingSpinner } from './component-tables/LoadingSpinner';

interface ProductTableProps {
  products: Product[];
  itemsPerPage?: number;
}

export default function ProductTable({ products, itemsPerPage = 5 }: ProductTableProps) {
  // State management
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev'>('next');
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage);
  
  // Delete confirmation modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  
  // Determine grid columns based on itemsPerPage
  const getGridColumns = (itemsCount: number): string => {
    if (itemsCount <= 5) return 'grid grid-cols-1 md:grid-cols-1';
    if (itemsCount <= 10) return 'grid grid-cols-1 md:grid-cols-2';
    if (itemsCount <= 15) return 'grid grid-cols-1 md:grid-cols-3';
    return 'grid grid-cols-2 md:grid-cols-4';
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.parentSku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.productId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPageState);
  const startIndex = (currentPage - 1) * itemsPerPageState;
  const endIndex = startIndex + itemsPerPageState;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  
  // Calculate grid columns based on current items per page
  const gridColumns = getGridColumns(itemsPerPageState);
  
  // Update visible products with animation
  useEffect(() => {
    const handlePageTransition = async () => {
      setIsAnimating(true);
      
      // Small delay to allow animation to start
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Set visible products after animation started
      setVisibleProducts(currentProducts);
      
      // End animation after transition time
      setTimeout(() => {
        setIsAnimating(false);
      }, 350);
    };
    
    handlePageTransition();
    // Dependency on stringified filtered products to avoid reference issues
  }, [currentPage, itemsPerPageState, searchTerm, JSON.stringify(filteredProducts)]);
  
  // Handle checkbox selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProducts(visibleProducts.map(product => product.id));
    } else {
      setSelectedProducts([]);
    }
  };
  
  const handleSelectProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(productId => productId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };
  
  // Handle page navigation
  const handlePageChange = (pageNumber: number) => {
    const newPage = Math.max(1, Math.min(pageNumber, totalPages));
    
    if (newPage === currentPage) return;
    
    // Set animation direction based on navigation
    setAnimationDirection(newPage > currentPage ? 'next' : 'prev');
    setCurrentPage(newPage);
  };
  
  // Handle items per page change
  const handleItemsPerPageChange = (count: number) => {
    setAnimationDirection('prev');
    setItemsPerPageState(count);
    setCurrentPage(1);
  };
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnimationDirection('prev');
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };
  
  // Check if all visible products are selected
  const isAllSelected = visibleProducts.length > 0 && 
    visibleProducts.every(product => selectedProducts.includes(product.id));
  
  // Delete handlers
  const openDeleteModal = (productId: string) => {
    setProductToDelete(productId);
    setIsBulkDelete(false);
    setShowDeleteModal(true);
  };
  
  const openBulkDeleteModal = () => {
    if (selectedProducts.length === 0) return;
    setIsBulkDelete(true);
    setShowDeleteModal(true);
  };
  
  const handleDelete = () => {
    // Here you would implement the actual deletion logic
    // For now we'll just simulate it
    if (isBulkDelete) {
      console.log(`Deleting ${selectedProducts.length} products:`, selectedProducts);
      // In a real app, you would call an API to delete these products
      // After successful deletion:
      setSelectedProducts([]);
    } else if (productToDelete) {
      console.log(`Deleting product: ${productToDelete}`);
      // In a real app, you would call an API to delete this product
      // After successful deletion:
      setSelectedProducts(selectedProducts.filter(id => id !== productToDelete));
    }
    
    // Close the modal
    setShowDeleteModal(false);
    setProductToDelete(null);
  };
  
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
    setIsBulkDelete(false);
  };
  
  // Find product name for deletion confirmation
  const getProductToDeleteName = () => {
    if (isBulkDelete) {
      return `${selectedProducts.length} products`;
    } else if (productToDelete) {
      const product = products.find(p => p.id === productToDelete);
      return product ? product.name : 'this product';
    }
    return '';
  };
  
  // Demo products if none provided
  const demoProducts: Product[] = [
    {
      id: '1',
      name: 'Premium Laptop Pro',
      parentSku: 'LAP-PRO-17',
      productId: 'LP17001',
      image: '',
      sale: 189,
      price: '$1499.99',
      stock: 32,
      status: 'active'
    },
    {
      id: '2',
      name: 'Wireless Noise-Cancelling Headphones',
      parentSku: 'AUDIO-WH-200',
      productId: 'AWH20022',
      image: '',
      sale: 327,
      price: '$179.99',
      stock: 85,
      status: 'active'
    },
    {
      id: '3',
      name: 'Smart Watch Series X',
      parentSku: 'WATCH-SMX-44',
      productId: 'WSX4433',
      image: '',
      sale: 251,
      price: '$299.99',
      stock: 41,
      status: 'needImproved',
      qualityInfo: {
        message: 'Missing technical specifications',
        level: 'warning'
      }
    }
  ];
  
  // Use demo products if none provided
  const displayProducts = products.length > 0 ? products : demoProducts;
  const displayFilteredProducts = filteredProducts.length > 0 ? filteredProducts : 
    (products.length === 0 ? demoProducts : []);
  
  return (
    <div className="bg-white rounded-md border border-gray-200 shadow-sm">
      {/* Search bar and view mode toggle */}
      <SearchBar 
        searchTerm={searchTerm}
        onSearch={handleSearchChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        selectedCount={selectedProducts.length}
        onBulkDelete={openBulkDeleteModal}
      />
      
      {/* Animation Styles */}
      <AnimationStyles />
      
      {/* Loading spinner
      <LoadingSpinner isAnimating={isAnimating} /> */}
      
      {/* Content based on view mode */}
      {viewMode === 'list' ? (
        <ListView 
          products={visibleProducts}
          selectedProducts={selectedProducts}
          onSelectProduct={handleSelectProduct}
          onDeleteProduct={openDeleteModal}
          onSelectAll={handleSelectAll}
          isAllSelected={isAllSelected}
          isAnimating={isAnimating}
          animationDirection={animationDirection}
        />
      ) : (
        <GridView 
          products={visibleProducts}
          selectedProducts={selectedProducts}
          onSelectProduct={handleSelectProduct}
          onDeleteProduct={openDeleteModal}
          isAnimating={isAnimating}
          animationDirection={animationDirection}
          gridColumns={gridColumns}
        />
      )}
      
      {/* Pagination */}
      {totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={displayProducts.length}
          filteredTotal={displayFilteredProducts.length}
          itemsPerPage={itemsPerPageState}
          isAnimating={isAnimating}
          animationDirection={animationDirection}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}
      
      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        isBulkDelete={isBulkDelete}
        itemName={getProductToDeleteName()}
        onConfirm={handleDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}