import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Search, ChevronDown, ChevronUp, Sun, Leaf, Filter } from 'lucide-react';
import { RootState } from '@/redux/store';
import { 
  setFilters, 
  clearFilters 
} from '@/redux/features/product/productSlice';

// Define our types
interface Category {
  id: string;
  name: string;
}

type ExpandedSections = {
  categories: boolean;
  seasonal: boolean;
  type: boolean;
};

type SeasonalOption = 'all' | 'in-season';
type ProductType = 'all' | 'organic' | 'conventional';

interface FilterState {
  searchTerm: string;
  selectedCategories: string[];
  selectedSeasonal: SeasonalOption;
  selectedType: ProductType;
}

export default function SidebarProduct() {
  const dispatch = useAppDispatch();
  const {loading, filters: reduxFilters } = useAppSelector((state: RootState) => state.products);
  
  const [expanded, setExpanded] = useState<ExpandedSections>({
    categories: true,
    seasonal: true,
    type: true
  });
  
  // Initialize local filter state from Redux state
  const [filters, setLocalFilters] = useState<FilterState>({
    searchTerm: reduxFilters?.search || '',
    selectedCategories: reduxFilters?.categories || [],
    selectedSeasonal: reduxFilters?.seasonal || 'all',
    selectedType: reduxFilters?.type || 'all'
  });
  
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if we're on mobile on initial load and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the md breakpoint in Tailwind
    };
    
    // Set initial value
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Update local filters when Redux filters change
  useEffect(() => {
    if (reduxFilters) {
      setLocalFilters({
        searchTerm: reduxFilters.search || '',
        selectedCategories: reduxFilters.categories || [],
        selectedSeasonal: reduxFilters.seasonal || 'all',
        selectedType: reduxFilters.type || 'all'
      });
    }
  }, [reduxFilters]);

  // Extract available categories from products
  const availableCategories: Category[] = [
    { id: 'fruits', name: 'Fruits' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'exotic', name: 'Exotic Produce' },
    { id: 'organic', name: 'Organic Selection' }
  ];

  const toggleCategory = (categoryId: string): void => {
    setLocalFilters(prev => {
      if (prev.selectedCategories.includes(categoryId)) {
        return {
          ...prev,
          selectedCategories: prev.selectedCategories.filter(id => id !== categoryId)
        };
      } else {
        return {
          ...prev,
          selectedCategories: [...prev.selectedCategories, categoryId]
        };
      }
    });
  };

  const toggleExpanded = (section: keyof ExpandedSections): void => {
    setExpanded({
      ...expanded,
      [section]: !expanded[section]
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilters(prev => ({ ...prev, searchTerm: e.target.value }));
  };

  const handleSeasonalChange = (value: SeasonalOption) => {
    setLocalFilters(prev => ({ ...prev, selectedSeasonal: value }));
  };

  const handleTypeChange = (value: ProductType) => {
    setLocalFilters(prev => ({ ...prev, selectedType: value }));
  };

  const handleClearFilters = () => {
    // Reset local filters
    setLocalFilters({
      searchTerm: '',
      selectedCategories: [],
      selectedSeasonal: 'all',
      selectedType: 'all'
    });
    
    // Clear Redux filters
    dispatch(clearFilters());
  };

  const applyFilters = () => {
    // Dispatch the filters to Redux
    dispatch(setFilters({
      search: filters.searchTerm,
      categories: filters.selectedCategories,
      seasonal: filters.selectedSeasonal,
      type: filters.selectedType
    }));
  };

  // Animation and position classes based on visibility state
  const sidebarClasses = `
    bg-white p-4 border-r border-gray-200
    transform transition-all duration-300 ease-in-out
    ${isVisible ? 'translate-x-0' : '-translate-x-full'}
    ${isMobile 
      ? 'w-full h-auto z-30 fixed top-0 left-0 right-0 bottom-0 overflow-y-auto'
      : 'w-64 sticky top-4 max-h-screen overflow-y-auto'
    }
  `;

  return (
    <div className={sidebarClasses}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-green-700">Filter Products</h2>
        <button 
          onClick={() => setIsVisible(!isVisible)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {isVisible ? '←' : '→'}
        </button>
      </div>
      
      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search fruits & vegetables..."
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 ease-in-out hover:border-green-300"
            value={filters.searchTerm}
            onChange={handleSearchChange}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
        </div>
      </div>
      
      {/* Categories */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <div 
          className="flex items-center justify-between cursor-pointer mb-2"
          onClick={() => toggleExpanded('categories')}
        >
          <h3 className="font-medium text-gray-800 flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Categories
          </h3>
          {expanded.categories ? 
            <ChevronUp className="h-4 w-4 transition-transform duration-200" /> : 
            <ChevronDown className="h-4 w-4 transition-transform duration-200" />
          }
        </div>
        
        <div 
          className={`pl-2 mt-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
            expanded.categories ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {availableCategories.map((category) => (
            <div key={category.id} className="flex items-center transform transition hover:translate-x-1 duration-200">
              <input
                type="checkbox"
                id={category.id}
                checked={filters.selectedCategories.includes(category.id)}
                onChange={() => toggleCategory(category.id)}
                className="mr-2 h-4 w-4 rounded text-green-600 focus:ring-green-500"
              />
              <label htmlFor={category.id} className="text-sm text-gray-700">{category.name}</label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Seasonal Filter */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <div 
          className="flex items-center justify-between cursor-pointer mb-2"
          onClick={() => toggleExpanded('seasonal')}
        >
          <h3 className="font-medium text-gray-800 flex items-center">
            <Sun className="mr-2 h-4 w-4" />
            Seasonal
          </h3>
          {expanded.seasonal ? 
            <ChevronUp className="h-4 w-4 transition-transform duration-200" /> : 
            <ChevronDown className="h-4 w-4 transition-transform duration-200" />
          }
        </div>
        
        <div 
          className={`pl-2 mt-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
            expanded.seasonal ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex items-center transform transition hover:translate-x-1 duration-200">
            <input
              type="radio"
              id="all-seasons"
              name="seasonal"
              value="all"
              checked={filters.selectedSeasonal === 'all'}
              onChange={() => handleSeasonalChange('all')}
              className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500"
            />
            <label htmlFor="all-seasons" className="text-sm text-gray-700">All Items</label>
          </div>
          <div className="flex items-center transform transition hover:translate-x-1 duration-200">
            <input
              type="radio"
              id="in-season"
              name="seasonal"
              value="in-season"
              checked={filters.selectedSeasonal === 'in-season'}
              onChange={() => handleSeasonalChange('in-season')}
              className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500"
            />
            <label htmlFor="in-season" className="text-sm text-gray-700">In Season</label>
          </div>
        </div>
      </div>
      
      {/* Organic/Conventional */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <div 
          className="flex items-center justify-between cursor-pointer mb-2"
          onClick={() => toggleExpanded('type')}
        >
          <h3 className="font-medium text-gray-800 flex items-center">
            <Leaf className="mr-2 h-4 w-4" />
            Product Type
          </h3>
          {expanded.type ? 
            <ChevronUp className="h-4 w-4 transition-transform duration-200" /> : 
            <ChevronDown className="h-4 w-4 transition-transform duration-200" />
          }
        </div>
        
        <div 
          className={`pl-2 mt-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
            expanded.type ? 'max-h-36 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex items-center transform transition hover:translate-x-1 duration-200">
            <input
              type="radio"
              id="all-types"
              name="type"
              value="all"
              checked={filters.selectedType === 'all'}
              onChange={() => handleTypeChange('all')}
              className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500"
            />
            <label htmlFor="all-types" className="text-sm text-gray-700">All Items</label>
          </div>
          <div className="flex items-center transform transition hover:translate-x-1 duration-200">
            <input
              type="radio"
              id="organic"
              name="type"
              value="organic"
              checked={filters.selectedType === 'organic'}
              onChange={() => handleTypeChange('organic')}
              className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500"
            />
            <label htmlFor="organic" className="text-sm text-gray-700">Organic Only</label>
          </div>
          <div className="flex items-center transform transition hover:translate-x-1 duration-200">
            <input
              type="radio"
              id="conventional"
              name="type"
              value="conventional"
              checked={filters.selectedType === 'conventional'}
              onChange={() => handleTypeChange('conventional')}
              className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500"
            />
            <label htmlFor="conventional" className="text-sm text-gray-700">Conventional</label>
          </div>
        </div>
      </div>
      
      {/* Buttons */}
      <div className="flex flex-col gap-2">
        {/* Apply Filters Button */}
        <button 
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transform transition duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          onClick={applyFilters}
          disabled={loading}
        >
          {loading ? 'Applying...' : 'Apply Filters'}
        </button>
        
        {/* Clear Filters Button */}
        <button 
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-medium transform transition duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          onClick={handleClearFilters}
          disabled={loading}
        >
          Clear Filters
        </button>
      </div>
      
      {/* Mobile overlay backdrop */}
      {isMobile && isVisible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsVisible(false)}
        />
      )}
    </div>
  );
}