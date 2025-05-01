"use client";

import React, { useState } from "react";
import DashboardLayout from "@/component/dashboardNavbarLayout/DashboardLayout";
import Image from "next/image";
import { ProductImageUploader, ProductPreview } from "@/component/uploadimage";

// Color palette from the image
const colors = {
  mediumGreen: "#2E8B57",
  skyBlue: "#87CEEB",
  paleGreen: "#E6F4EA",
  darkGreen: "#20603D",
};

export default function EditProductPage() {
  const defaultCollapsed = {
    order: true,
    product: false,
    finance: true,
    store: true,
  };

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
  }

  // Product state with default values
  const [product, setProduct] = useState<ProductData>({
    name: "Organic Avocado",
    category: "Fruits",
    price: 3.99,
    salePrice: 2.99,
    stock: 150,
    unit: "each",
    description:
      "Fresh organic avocados sourced from local farms. Rich in healthy fats and perfect for salads, sandwiches, or making guacamole.",
    images: ["/placeholder/avocado.jpg", "/placeholder/avocado-cut.jpg"],
    nutrition: {
      calories: 160,
      fat: "15g",
      carbs: "9g",
      protein: "2g",
    },
    organic: true,
    featured: true,
  });

  const handleImagesChange = (images: string[]) => {
    setProduct({
      ...product,
      images,
    });
  };

  // Function to handle form changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // For handling rich text editor
  const handleDescriptionChange = (content: string) => {
    setProduct({ ...product, description: content });
  };

  // For handling image uploads
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setSelectedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Define type for upcoming products
  interface UpcomingProduct {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
  }

  // Upcoming products for the preview section
  const upcomingProducts: UpcomingProduct[] = [
    {
      id: 1,
      name: "Organic Strawberries",
      category: "Fruits",
      price: 4.99,
      image: "/api/placeholder/200/200",
    },
    {
      id: 2,
      name: "Fresh Spinach",
      category: "Vegetables",
      price: 2.49,
      image: "/api/placeholder/200/200",
    },
    {
      id: 3,
      name: "Red Bell Peppers",
      category: "Vegetables",
      price: 1.99,
      image: "/api/placeholder/200/200",
    },
  ];

  return (
    <DashboardLayout
      title="Edit Product"
      breadcrumb="Products > Edit Product"
      activePath="/seller-dashboard/edit-product"
      defaultCollapsed={defaultCollapsed}
      notificationCount={3}
      messageCount={2}
    >
      <div className="flex flex-col lg:flex-row gap-6 p-6 bg-white">
        {/* Left side - Form */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h1 className="text-2xl font-medium text-gray-800 mb-6">
              Edit Product
            </h1>

            {/* Form fields */}
            <form className="space-y-6">
              {/* Basic Info Section */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-medium text-gray-700 mb-4">
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={product.name}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-offset-0 focus:ring-opacity-50 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="Fruits">Fruits</option>
                      <option value="Vegetables">Vegetables</option>
                      <option value="Herbs">Herbs</option>
                      <option value="Organic Bundles">Organic Bundles</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-medium text-gray-700 mb-4">
                  Pricing
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Regular Price ($)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                      step="0.01"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
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
                </div>
              </div>

              {/* Inventory Section */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-medium text-gray-700 mb-4">
                  Inventory
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={product.stock}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div className="flex items-center space-x-6 mt-6">
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
                        Organic
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
                  Description
                </h2>

                <div>
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  ></textarea>
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
                  className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-500"
                  style={{ backgroundColor: colors.mediumGreen }}
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-500"
                  style={{ backgroundColor: colors.darkGreen }}
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right side - Preview */}
        <div className="lg:w-1/3">
          {/* Product Preview */}
          <ProductPreview product={product} />

          {/* Upcoming Products */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Upcoming Products
            </h2>

            <div className="space-y-4">
              {upcomingProducts.map((item) => (
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
                    ${item.price}
                  </div>
                </div>
              ))}

              <button
                className="w-full py-2 text-sm text-center text-white rounded-md"
                style={{ backgroundColor: colors.skyBlue }}
              >
                View All Upcoming
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
