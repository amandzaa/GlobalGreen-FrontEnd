"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import DashboardLayout from "@/component/layout-dashboard/DashboardLayout";
import { ProductImageUploader, ProductPreview } from "@/component/uploadimage";
import { colors } from "@/types";

// Define product schema with Zod
const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  salePrice: z.number().min(0, "Sale price cannot be negative"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  unit: z.string(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  nutrition: z.object({
    calories: z.number().min(0, "Calories cannot be negative"),
    fat: z.string(),
    carbs: z.string(),
    protein: z.string(),
  }),
  organic: z.boolean(),
  featured: z.boolean(),
  status: z.enum(["draft", "published"]),
});

// Type derived from the schema
type ProductFormValues = z.infer<typeof productSchema>;

export default function AddNewProductPage() {
  // Initialize the form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
    setValue,
    getValues,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category: "Fruits",
      price: 0,
      salePrice: 0,
      stock: 0,
      unit: "each",
      description: "",
      nutrition: {
        calories: 0,
        fat: "0g",
        carbs: "0g",
        protein: "0g",
      },
      organic: false,
      featured: false,
      status: "draft",
    },
  });

  // Watch values for preview component
  const productValues = watch();

  // List of available categories
  const categories = [
    { id: 1, name: "Fruits" },
    { id: 2, name: "Vegetables" },
    { id: 3, name: "Herbs" },
    { id: 4, name: "Organic Bundles" },
    { id: 5, name: "Fresh Juices" },
    { id: 6, name: "Dried Fruits" },
  ];

  // Handle images separately
  const [images, setImages] = React.useState<string[]>([]);

  const handleImagesChange = (newImages: string[]) => {
    setImages(newImages);
  };

  // Form submission handler
  const onSubmit = (data: ProductFormValues) => {
    const productData = {
      ...data,
      images, // Add the images to the form data
    };
    console.log("Submitting product:", productData);
    alert("Product successfully added!");
    // Here you would typically send the data to your API
  };

  // Save as draft handler
  const handleSaveAsDraft = () => {
    const currentValues = getValues();
    const productData = {
      ...currentValues,
      images,
      status: "draft",
    };
    console.log("Saving draft:", productData);
    alert("Product saved as draft!");
  };

  // Calculate form completion percentage
  const calculateCompletion = () => {
    const fields = ["name", "price", "stock", "description"];
    const completed = fields.filter((field) => {
      const value = getValues(field as any);
      return field === "description" 
        ? value && value.length >= 10
        : field === "price" || field === "stock" 
          ? value > 0 
          : value;
    });
    
    return (completed.length / fields.length) * 100;
  };

  const completionPercentage = calculateCompletion();

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

  return (
    <DashboardLayout
      title="Add New Product"
      breadcrumb="Products > Add New Product"
      activePath="/seller-dashboard/add-product"
      defaultCollapsed={{ product: false }}
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
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                      {...register("name")}
                      className={`w-full p-2 border ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:ring-2 focus:ring-offset-0 focus:ring-opacity-50 focus:ring-green-500 focus:border-green-500`}
                      placeholder="Enter product name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Choose a descriptive and appealing name
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category<span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("category")}
                      className={`w-full p-2 border ${
                        errors.category ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.category.message}
                      </p>
                    )}
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
                      step="0.01"
                      min="0"
                      {...register("price", { valueAsNumber: true })}
                      className={`w-full p-2 border ${
                        errors.price ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                    />
                    {errors.price && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sale Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      {...register("salePrice", { valueAsNumber: true })}
                      className={`w-full p-2 border ${
                        errors.salePrice ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                    />
                    {errors.salePrice && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.salePrice.message}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Leave 0 if not on sale
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit
                    </label>
                    <select
                      {...register("unit")}
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
                      min="0"
                      {...register("stock", { valueAsNumber: true })}
                      className={`w-full p-2 border ${
                        errors.stock ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                    />
                    {errors.stock && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.stock.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2 flex items-center space-x-6 mt-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="organic"
                        {...register("organic")}
                        className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <label
                        htmlFor="organic"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Organic Product
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Images Section */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-medium text-gray-700 mb-4">
                  Product Images<span className="text-red-500">*</span>
                </h2>
                <ProductImageUploader
                  images={images}
                  onImagesChange={handleImagesChange}
                  required={true}
                />
                {images.length === 0 && (
                  <p className="mt-1 text-xs text-red-500">
                    At least one image is required
                  </p>
                )}
              </div>

              {/* Description Section */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-medium text-gray-700 mb-4">
                  Description<span className="text-red-500">*</span>
                </h2>

                <div>
                  <textarea
                    {...register("description")}
                    rows={4}
                    className={`w-full p-2 border ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                    placeholder="Describe your product's features, benefits, origin, etc."
                  ></textarea>
                  {errors.description && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.description.message}
                    </p>
                  )}
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
                      min="0"
                      {...register("nutrition.calories", { valueAsNumber: true })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    {errors.nutrition?.calories && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.nutrition.calories.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fat
                    </label>
                    <input
                      type="text"
                      {...register("nutrition.fat")}
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
                      {...register("nutrition.carbs")}
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
                      {...register("nutrition.protein")}
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
                    backgroundColor: isValid && images.length > 0
                      ? colors.darkGreen
                      : colors.primary,
                  }}
                  disabled={!isValid || images.length === 0}
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
          <ProductPreview product={{ ...productValues, images }} />

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