"use client";

import React from "react";
import { colors } from "@/types";


// Define types for product state
export interface ProductNutrition {
  calories: number;
  fat: string;
  carbs: string;
  protein: string;
}

export interface ProductData {
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
export interface Category {
  id: number;
  name: string;
}

// Default product data
export const defaultProductData: ProductData = {
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
};

// Form Progress interface for tracking completion
export interface FormProgress {
  basicInfo: boolean;
  pricing: boolean;
  images: boolean;
  description: boolean;
}

// Default categories
export const defaultCategories: Category[] = [
  { id: 1, name: "Fruits" },
  { id: 2, name: "Vegetables" },
  { id: 3, name: "Herbs" },
  { id: 4, name: "Organic Bundles" },
  { id: 5, name: "Fresh Juices" },
  { id: 6, name: "Dried Fruits" },
];

// Progress bar component
export const ProgressBar = ({ 
  completionPercentage 
}: { 
  completionPercentage: number 
}) => {
  return (
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
  );
};

// Basic Information Form Component
export const BasicInfoSection = ({
  product,
  handleChange,
  categories = defaultCategories,
}: {
  product: ProductData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  categories?: Category[];
}) => {
  return (
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
  );
};

// Pricing & Inventory Section Component
export const PricingSection = ({
  product,
  handleChange,
}: {
  product: ProductData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}) => {
  return (
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
  );
};

// Description Section Component
export const DescriptionSection = ({
  product,
  handleChange,
}: {
  product: ProductData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}) => {
  return (
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
  );
};

// Nutrition Facts Section Component
export const NutritionSection = ({
  product,
  setProduct,
}: {
  product: ProductData;
  setProduct: React.Dispatch<React.SetStateAction<ProductData>>;
}) => {
  return (
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
  );
};

// Action Buttons Component
export const ActionButtons = ({
  handleSubmit,
  handleSaveAsDraft,
  formProgress,
  isEdit = false,
}: {
  handleSubmit: (e: React.FormEvent) => void;
  handleSaveAsDraft: () => void;
  formProgress: FormProgress;
  isEdit?: boolean;
}) => {
  return (
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
        {isEdit ? "Update Product" : "Add Product"}
      </button>
    </div>
  );
};

// Tips Component
export const ProductTips = () => {
  return (
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
  );
};

// Similar Products Component
export const SimilarProducts = ({
  similarProducts
}: {
  similarProducts: Array<{
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
  }>;
}) => {
  return (
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
  );
};