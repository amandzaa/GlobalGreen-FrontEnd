"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/component/layout-dashboard/DashboardLayout";
import { Button } from "@/component/ui/button";
import { 
  ProductData, 
  FormProgress, 
  defaultProductData,
  defaultCategories,
  ProgressBar,
  BasicInfoSection,
  PricingSection,
  DescriptionSection,
  NutritionSection,
  ActionButtons,
  ProductTips,
  ProductImageUploader,
  ProductPreview
} from "@/component/uploadimage";
import { Input } from "@/component/ui/Input";
import { Edit, Plus, Trash2, Search, Loader2, ArrowLeft } from "lucide-react";
import { CustomProductData } from "@/component/uploadimage/types";

export default function ProductManagementPage() {

  // States for product management
  const [products, setProducts] = useState<CustomProductData[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [product, setProduct] = useState<ProductData & { id?: string }>({
    ...defaultProductData,
    id: undefined
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showProductSearch, setShowProductSearch] = useState<boolean>(true);

  // For tracking form completion
  const [formProgress, setFormProgress] = useState<FormProgress>({
    basicInfo: false,
    pricing: false,
    images: false,
    description: false,
  });

  // Sample registered products for demonstration
  const registeredProducts = [
    {
      id: "PROD-001",
      name: "Organic Apples",
      category: "Fruits",
      price: 3.49,
      thumbnail: "/api/placeholder/100/100",
      stock: 50,
      description: "Fresh organic apples from local farms.",
      isOnSale: true,
      salePrice: 2.99
    },
    {
      id: "PROD-002",
      name: "Fresh Broccoli",
      category: "Vegetables",
      price: 2.29,
      thumbnail: "/api/placeholder/100/100",
      stock: 30,
      description: "Fresh broccoli rich in vitamins and minerals.",
      isOnSale: false
    },
    {
      id: "PROD-003",
      name: "Organic Bananas",
      category: "Fruits",
      price: 1.99,
      thumbnail: "/api/placeholder/100/100",
      stock: 45,
      description: "Organic and ethically sourced bananas.",
      isOnSale: true,
      salePrice: 1.59
    },
    {
      id: "PROD-004",
      name: "Fresh Farm Eggs",
      category: "Dairy & Eggs",
      price: 4.99,
      thumbnail: "/api/placeholder/100/100",
      stock: 24,
      description: "Farm-fresh eggs from free-range chickens.",
      isOnSale: false
    },
    {
      id: "PROD-005",
      name: "Whole Grain Bread",
      category: "Bakery",
      price: 3.49,
      thumbnail: "/api/placeholder/100/100",
      stock: 15,
      description: "Freshly baked whole grain bread.",
      isOnSale: false
    }
  ];

  // Filter products based on search term
  const filteredProducts = registeredProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle form changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    
    // Handle numeric fields specially
    if (name === "price" || name === "salePrice" || name === "stock") {
      setProduct({
        ...product,
        [name]: type === "checkbox" ? checked : Number(value),
      });
    } else {
      setProduct({
        ...product,
        [name]: type === "checkbox" ? checked : value,
      });
    }

    // Update form progress
    updateFormProgress(name, value);
  };

  const updateFormProgress = (name: string, value: any) => {
    if (name === "name" && value.trim() !== "") {
      setFormProgress((prev) => ({ ...prev, basicInfo: true }));
    } else if ((name === "price" || name === "stock") && Number(value) > 0) {
      setFormProgress((prev) => ({ ...prev, pricing: true }));
    } else if (name === "description" && value.toString().trim().length > 10) {
      setFormProgress((prev) => ({ ...prev, description: true }));
    }
  };

  const handleImagesChange = (images: string[]) => {
    setProduct({
      ...product,
      images,
    });
    
    // Update form progress for images
    setFormProgress((prev) => ({ ...prev, images: images.length > 0 }));
  };

  // Function to load product data by ID
  const loadProductById = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call to fetch product data
      // In a real app, this would be an actual API call
      setTimeout(() => {
        const selectedProduct = registeredProducts.find(p => p.id === id);
        if (selectedProduct) {
          // Populate form with product data
          // Cast to allow id property
          const productData = {
            ...defaultProductData,
            name: selectedProduct.name,
            category: selectedProduct.category,
            price: selectedProduct.price,
            stock: selectedProduct.stock || 0,
            description: selectedProduct.description || "",
            isOnSale: selectedProduct.isOnSale || false,
            salePrice: selectedProduct.salePrice || 0,
            images: selectedProduct.thumbnail ? [selectedProduct.thumbnail] : [],
            id: selectedProduct.id
          } as ProductData & { id: string };
          
          setProduct(productData);
          setSelectedProductId(id);
          
          // Update form progress based on populated data
          setFormProgress({
            basicInfo: !!productData.name,
            pricing: productData.price > 0,
            images: productData.images.length > 0,
            description: (productData.description?.length || 0) > 10,
          });
          
          // Hide the product search section
          setShowProductSearch(false);
        }
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error loading product:", error);
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to your API
    console.log("Saving product:", product);
    
        // Update local state if needed
    setProducts(prevProducts => {
      const productWithId = {
        ...product,
        id: selectedProductId || `PROD-${String(Date.now()).slice(-6)}`
      } as CustomProductData;
      
      if (selectedProductId) {
        const index = prevProducts.findIndex(p => p.id === selectedProductId);
        if (index >= 0) {
          // Update existing product
          const updatedProducts = [...prevProducts];
          updatedProducts[index] = productWithId;
          return updatedProducts;
        }
      }
      
      // Add new product
      return [...prevProducts, productWithId];
    });
    
    // Exit edit mode
    setIsEditMode(false);
    resetForm();
  };

  // Reset form to default state
  const resetForm = () => {
    setProduct(defaultProductData);
    setSearchTerm("");
    setSelectedProductId(null);
    setShowProductSearch(true);
    setFormProgress({
      basicInfo: false,
      pricing: false,
      images: false,
      description: false,
    });
  };

  // Create new product function
  const handleCreateNewProduct = () => {
    resetForm();
    setShowProductSearch(false);
    setIsEditMode(true);
  };

  // Edit existing product function
  const handleEditProduct = (productId: string) => {
    loadProductById(productId);
    setIsEditMode(true);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Calculate overall form completion percentage
  const completionPercentage =
    (Object.values(formProgress).filter(Boolean).length /
      Object.values(formProgress).length) *
    100;

  return (
    <DashboardLayout
      title="Product Management"
      breadcrumb="Products > Product Management"
      activePath="/seller-dashboard/products"
      defaultCollapsed={{product: false}}
      notificationCount={3}
      messageCount={2}
    >
      <div className="p-6 bg-white">
        {isEditMode ? (
          // Product Edit Form
          <div>
            <div className="flex items-center mb-6">
              <Button 
                variant="outline" 
                className="mr-4" 
                onClick={() => {
                  setIsEditMode(false);
                  resetForm();
                }}
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Product List
              </Button>
              <h1 className="text-2xl font-medium text-gray-800">
                {selectedProductId ? `Edit Product: ${selectedProductId}` : "Add New Product"}
              </h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left side - Form */}
              <div className="lg:w-2/3">
                {/* Product Search Section */}
                {showProductSearch && (
                  <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                    <h2 className="text-lg font-medium mb-4">Select a Product to Edit</h2>
                    <div className="flex gap-2 mb-4">
                      <Input
                        type="text"
                        placeholder="Search by product ID or name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="button" size="icon">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="max-h-60 overflow-y-auto">
                      {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-2">
                          {filteredProducts.map((p) => (
                            <div
                              key={p.id}
                              className="flex items-center p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50"
                              onClick={() => loadProductById(p.id)}
                            >
                              {p.thumbnail && (
                                <img
                                  src={p.thumbnail}
                                  alt={p.name}
                                  className="w-12 h-12 object-cover mr-3 rounded"
                                />
                              )}
                              <div>
                                <p className="font-medium">{p.name}</p>
                                <p className="text-sm text-gray-500">ID: {p.id}</p>
                              </div>
                              <p className="ml-auto">${p.price.toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-gray-500 py-4">
                          {searchTerm ? "No products found" : "Enter a search term to find products"}
                        </p>
                      )}
                    </div>
                    
                    <div className="mt-4 text-right">
                      <Button 
                        type="button" 
                        onClick={() => setShowProductSearch(false)}
                        variant="outline"
                      >
                        Create New
                      </Button>
                    </div>
                  </div>
                )}

                {isLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <span className="ml-2">Loading product data...</span>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Progress indicator */}
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-medium">
                        {selectedProductId ? `Editing Product: ${selectedProductId}` : "Product Information"}
                      </h3>
                      <ProgressBar completionPercentage={completionPercentage} />
                    </div>

                    {/* Basic Info Section */}
                    <BasicInfoSection
                      product={product}
                      handleChange={handleChange}
                      categories={defaultCategories}
                    />

                    {/* Pricing Section */}
                    <PricingSection
                      product={product}
                      handleChange={handleChange}
                    />

                    {/* Images Section */}
                    <ProductImageUploader
                      images={product.images}
                      onImagesChange={handleImagesChange}
                      required={true}
                    />

                    {/* Description Section */}
                    <DescriptionSection
                      product={product}
                      handleChange={handleChange}
                    />

                    {/* Nutrition Facts */}
                    <NutritionSection
                      product={product}
                      setProduct={setProduct}
                    />

                    {/* Action Buttons */}
                    <ActionButtons
                      handleSubmit={handleSubmit}
                      handleSaveAsDraft={() => {}}
                      formProgress={formProgress}
                      isEdit={!!selectedProductId}
                    />
                  </form>
                )}
              </div>

              {/* Right side - Preview & Tips */}
              <div className="lg:w-1/3">
                {/* Product Preview */}
                <ProductPreview product={product} />

                {/* Tips */}
                <ProductTips />
              </div>
            </div>
          </div>
        ) : (
          // Product List View
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-medium text-gray-800">Product Management</h1>
              <div className="flex space-x-2">
                <Button onClick={handleCreateNewProduct} className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" /> Add New Product
                </Button>
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {registeredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {product.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded object-cover"
                              src={product.thumbnail || "/api/placeholder/100/100"}
                              alt={product.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatCurrency(product.price)}
                        </div>
                        {product.isOnSale && (
                          <div className="text-xs text-green-600">
                            Sale: {formatCurrency(product.salePrice || 0)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditProduct(product.id)}
                            className="p-1"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm"
                            variant="outline"
                            className="p-1 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}