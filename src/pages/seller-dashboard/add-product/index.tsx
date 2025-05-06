"use client";

import React, { useState } from "react";
import DashboardLayout from "@/component/layout-dashboard/DashboardLayout";
import { ProductImageUploader, ProductPreview } from "@/component/uploadimage";
import { colors } from "@/types";

// Define types for product state
interface ProductNutrition {
  calories: number;
  fat: string;
  carbs: string;
  protein: string;
}

interface ProductData {
  name: string;
  category: string;
  price: number;
  salePrice: number;
  stock: number;
  unit: string;
  description: string;
  images: string[];
  nutrition: ProductNutrition;
  organic: boolean;
  featured: boolean;
  status: "draft" | "published";
}

// Define type for product categories
interface Category {
  id: number;
  name: string;
}

export default function AddNewProductPage() {

  // Empty product state for new products
  const [product, setProduct] = useState<ProductData>({
    name: "",
    category: "Fruits",
    price: 0,
    salePrice: 0,
    stock: 0,
    unit: "each",
    description: "",
    images: [],
    nutrition: {
      calories: 0,
      fat: "0g",
      carbs: "0g",
      protein: "0g",
    },
    organic: false,
    featured: false,
    status: "draft",
  });

  // For tracking form completion
  const [formProgress, setFormProgress] = useState({
    basicInfo: false,
    pricing: false,
    images: false,
    description: false,
  });

  // Function to handle form changes - FIXED to ensure numeric values
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
        [name]: type === "checkbox" ? checked : Number(value),  // Convert to number
      });
    } else {
      setProduct({
        ...product,
        [name]: type === "checkbox" ? checked : value,
      });
    }

    // Update form progress
    if (name === "name" && value.trim() !== "") {
      setFormProgress((prev) => ({ ...prev, basicInfo: true }));
    } else if ((name === "price" || name === "stock") && Number(value) > 0) {
      setFormProgress((prev) => ({ ...prev, pricing: true }));
    } else if (name === "description" && value.trim().length > 10) {
      setFormProgress((prev) => ({ ...prev, description: true }));
    }
  };

  // List of available categories
  const categories: Category[] = [
    { id: 1, name: "Fruits" },
    { id: 2, name: "Vegetables" },
    { id: 3, name: "Herbs" },
    { id: 4, name: "Organic Bundles" },
    { id: 5, name: "Fresh Juices" },
    { id: 6, name: "Dried Fruits" },
  ];

  // Sample similar products
  const similarProducts = [
    {
      id: 1,
      name: "Organic Apples",
      category: "Fruits",
      price: 3.49,
      image: "/api/placeholder/200/200",
    },
    {
      id: 2,
      name: "Fresh Broccoli",
      category: "Vegetables",
      price: 2.29,
      image: "/api/placeholder/200/200",
    },
    {
      id: 3,
      name: "Organic Bananas",
      category: "Fruits",
      price: 1.99,
      image: "/api/placeholder/200/200",
    },
  ];

  // Calculate overall form completion percentage
  const completionPercentage =
    (Object.values(formProgress).filter(Boolean).length /
      Object.values(formProgress).length) *
    100;

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log("Submitting product:", product);
    // Example of what you might do after successful submission:
    alert("Product successfully added!");
    // Redirect or clear form, etc.
  };

  // Handle save as draft
  const handleSaveAsDraft = () => {
    console.log("Saving draft:", product);
    alert("Product saved as draft!");
  };

  const handleImagesChange = (images: string[]) => {
    setProduct({
      ...product,
      images,
    });
  };

  return (
    <DashboardLayout
      title="Add New Product"
      breadcrumb="Products > Add New Product"
      activePath="/seller-dashboard/add-product"
      defaultCollapsed={{product: false}}
      notificationCount={3}
      messageCount={2}
    >
      <div className="flex flex-col lg:flex-row gap-6 p-6 bg-white">
        {/* Left side - Form */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-medium text-gray-800">
                Add New Product
              </h1>

              {/* Progress indicator */}
              <div className="flex items-center">
                <div className="w-40 bg-gray-200 rounded-full h-2.5 mr-2">
                  <div
                    className="h-2.5 rounded-full"
                    style={{
                      width: `${completionPercentage}%`,
                      backgroundColor: colors.primary,
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">
                  {Math.round(completionPercentage)}% complete
                </span>
              </div>
            </div>

            {/* Form fields */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Basic Info Section */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-medium text-gray-700 mb-4">
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={product.name}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-offset-0 focus:ring-opacity-50 focus:ring-green-500 focus:border-green-500"
                      required
                      placeholder="Enter product name"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Choose a descriptive and appealing name
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category<span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 text-xs text-gray-500">
                      Select the most relevant category
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-medium text-gray-700 mb-4">
                  Pricing & Inventory
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Regular Price ($)<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sale Price ($)
                    </label>
                    <input
                      type="number"
                      name="salePrice"
                      value={product.salePrice}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Leave 0 if not on sale
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit
                    </label>
                    <select
                      name="unit"
                      value={product.unit}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="each">Each</option>
                      <option value="lb">Pound (lb)</option>
                      <option value="kg">Kilogram (kg)</option>
                      <option value="bunch">Bunch</option>
                      <option value="bag">Bag</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Quantity<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={product.stock}
                      onChange={handleChange}
                      min="0"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>

                  <div className="md:col-span-2 flex items-center space-x-6 mt-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="organic"
                        name="organic"
                        checked={product.organic}
                        onChange={handleChange}
                        className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <label
                        htmlFor="organic"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Organic Product
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="featured"
                        name="featured"
                        checked={product.featured}
                        onChange={handleChange}
                        className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <label
                        htmlFor="featured"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Featured Product
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Images Section */}
              <ProductImageUploader
                images={product.images}
                onImagesChange={handleImagesChange}
                required={true}
              />

              {/* Description Section */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-medium text-gray-700 mb-4">
                  Description<span className="text-red-500">*</span>
                </h2>

                <div>
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Describe your product's features, benefits, origin, etc."
                    required
                  ></textarea>
                  <p className="mt-1 text-xs text-gray-500">
                    Min. 10 characters
                  </p>
                </div>
              </div>

              {/* Nutrition Facts */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-medium text-gray-700 mb-4">
                  Nutrition Facts
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Calories
                    </label>
                    <input
                      type="number"
                      name="nutrition.calories"
                      value={product.nutrition.calories}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          nutrition: {
                            ...product.nutrition,
                            calories: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fat
                    </label>
                    <input
                      type="text"
                      name="nutrition.fat"
                      value={product.nutrition.fat}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          nutrition: {
                            ...product.nutrition,
                            fat: e.target.value,
                          },
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g. 15g"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Carbs
                    </label>
                    <input
                      type="text"
                      name="nutrition.carbs"
                      value={product.nutrition.carbs}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          nutrition: {
                            ...product.nutrition,
                            carbs: e.target.value,
                          },
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g. 9g"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Protein
                    </label>
                    <input
                      type="text"
                      name="nutrition.protein"
                      value={product.nutrition.protein}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          nutrition: {
                            ...product.nutrition,
                            protein: e.target.value,
                          },
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g. 2g"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveAsDraft}
                  className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-500"
                  style={{ backgroundColor: colors.secondary }}
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-500"
                  style={{
                    backgroundColor:
                      formProgress.basicInfo &&
                      formProgress.pricing &&
                      formProgress.images &&
                      formProgress.description
                        ? colors.darkGreen
                        : colors.primary,
                  }}
                  disabled={
                    !formProgress.basicInfo ||
                    !formProgress.pricing ||
                    !formProgress.images ||
                    !formProgress.description
                  }
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right side - Preview & Tips */}
        <div className="lg:w-1/3">
          {/* Product Preview */}
          <ProductPreview product={product} />

          {/* Tips & Similar Products */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Tips for Better Products
            </h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <div
                  className="flex-shrink-0 p-1.5 bg-green-100 rounded-full"
                  style={{ backgroundColor: colors.paleGreen }}
                >
                  <svg
                    className="w-5 h-5 text-green-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: colors.darkGreen }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <p className="ml-3 text-sm text-gray-600">
                  Use high-quality images from multiple angles to showcase your
                  product.
                </p>
              </div>

              <div className="flex items-start">
                <div
                  className="flex-shrink-0 p-1.5 bg-green-100 rounded-full"
                  style={{ backgroundColor: colors.paleGreen }}
                >
                  <svg
                    className="w-5 h-5 text-green-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: colors.darkGreen }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <p className="ml-3 text-sm text-gray-600">
                  Write detailed descriptions highlighting freshness, origin,
                  and health benefits.
                </p>
              </div>

              <div className="flex items-start">
                <div
                  className="flex-shrink-0 p-1.5 bg-green-100 rounded-full"
                  style={{ backgroundColor: colors.paleGreen }}
                >
                  <svg
                    className="w-5 h-5 text-green-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: colors.darkGreen }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <p className="ml-3 text-sm text-gray-600">
                  Always include complete nutrition information to help
                  health-conscious customers.
                </p>
              </div>
            </div>
          </div>

          {/* Similar Products */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Similar Products
            </h2>

            <div className="space-y-4">
              {similarProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center p-3 border rounded-lg hover:bg-gray-50"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
              ))}

              <button
                className="w-full py-2 text-sm text-center text-white rounded-md"
                style={{ backgroundColor: colors.secondary }}
              >
                View All Similar Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}