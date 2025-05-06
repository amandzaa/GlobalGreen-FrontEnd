import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

// Product interface
export interface Product {
  id: string;
  name: string;
  parentSku: string;
  productId: string;
  image: string;
  sale: number;
  price: string;
  stock: number;
  status: string;
  qualityInfo?: {
    message: string;
    level: string;
  };
}

export interface ProductSelectionProps {
  selectedProducts: string[];
  onProductsChange: (selectedProducts: string[]) => void;
  products?: Product[]; // Optional: allows passing products from parent component
  error?: string;
}

export const ProductSelection: React.FC<ProductSelectionProps> = ({
  selectedProducts,
  onProductsChange,
  products,
  error
}) => {
  // Default sample products if none are provided
  const defaultProducts: Product[] = [
    {
      id: "1",
      name: "Premium Laptop Pro",
      parentSku: "LAP-PRO-17",
      productId: "LP17001",
      image: "",
      sale: 189,
      price: "$1499.99",
      stock: 32,
      status: "active",
    },
    {
      id: "2",
      name: "Wireless Noise-Cancelling Headphones",
      parentSku: "AUDIO-WH-200",
      productId: "AWH20022",
      image: "",
      sale: 327,
      price: "$179.99",
      stock: 85,
      status: "active",
    },
    {
      id: "3",
      name: "Smart Watch Series X",
      parentSku: "WATCH-SMX-44",
      productId: "WSX4433",
      image: "",
      sale: 251,
      price: "$299.99",
      stock: 41,
      status: "needImproved",
      qualityInfo: {
        message: "Missing technical specifications",
        level: "warning",
      },
    },
    {
      id: "4",
      name: "Mechanical Keyboard RGB",
      parentSku: "KB-MECH-RGB",
      productId: "KBM0144",
      image: "",
      sale: 116,
      price: "$129.99",
      stock: 67,
      status: "active",
    },
    {
      id: "5",
      name: "4K Curved Gaming Monitor",
      parentSku: "MON-CRV-32",
      productId: "MC3255",
      image: "",
      sale: 83,
      price: "$429.99",
      stock: 18,
      status: "active",
    },
    {
      id: "6",
      name: "External SSD 2TB",
      parentSku: "SSD-EXT-2T",
      productId: "SE2T66",
      image: "",
      sale: 203,
      price: "$219.99",
      stock: 54,
      status: "needImproved",
      qualityInfo: {
        message: "Missing detailed images",
        level: "info",
      },
    },
    {
      id: "7",
      name: "Ergonomic Office Chair",
      parentSku: "FURN-CHAIR-ERG",
      productId: "FCE0077",
      image: "",
      sale: 94,
      price: "$249.99",
      stock: 12,
      status: "needImproved",
      qualityInfo: {
        message: "Incomplete dimension specifications",
        level: "warning",
      },
    },
    {
      id: "8",
      name: "Wireless Gaming Mouse",
      parentSku: "MOUSE-WL-GM",
      productId: "MWG0088",
      image: "",
      sale: 178,
      price: "$89.99",
      stock: 105,
      status: "active",
    },
    {
      id: "9",
      name: "Bluetooth Portable Speaker",
      parentSku: "AUDIO-SPK-BT",
      productId: "ASB0099",
      image: "",
      sale: 231,
      price: "$69.99",
      stock: 72,
      status: "active",
    },
    {
      id: "10",
      name: "Smart Home Hub",
      parentSku: "SMRT-HUB-01",
      productId: "SHH0100",
      image: "",
      sale: 156,
      price: "$129.99",
      stock: 29,
      status: "needImproved",
      qualityInfo: {
        message: "Missing compatibility information",
        level: "error",
      },
    },
  ];

  // Use provided products or default samples
  const productList = products || defaultProducts;
  
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productList);

  // Filter products based on search term
  useEffect(() => {
    const filtered = productList.filter(product => 
      product.name.toLowerCase().includes(search.toLowerCase()) || 
      product.productId.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [search, productList]);

  const handleProductToggle = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      onProductsChange(selectedProducts.filter(id => id !== productId));
    } else {
      onProductsChange([...selectedProducts, productId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      onProductsChange([]);
    } else {
      onProductsChange(filteredProducts.map(product => product.id));
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className="pl-10 block w-full rounded-md border border-gray-300 bg-white py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Product List */}
      <div className="overflow-auto max-h-60 border border-gray-200 rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="w-10 px-3 py-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr 
                  key={product.id} 
                  className={`hover:bg-gray-50 ${selectedProducts.includes(product.id) ? 'bg-blue-50' : ''}`}
                  onClick={() => handleProductToggle(product.id)}
                >
                  <td className="px-3 py-2 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => {}} // Handled by row click
                      onClick={(e) => e.stopPropagation()} // Prevent row click event bubbling
                    />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    {product.productId}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 text-right">
                    {product.price}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 text-right">
                    {product.stock}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-3 py-2 text-center text-sm text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Selected Products Count */}
      <div className="text-sm text-gray-500">
        {selectedProducts.length} product(s) selected
      </div>

      {/* Error message if any */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};