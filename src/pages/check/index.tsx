// "use client";

// import React, { useState } from "react";
// import DashboardLayout from "@/component/layout-dashboard/DashboardLayout";
// import { colors } from "@/types";

// // Define types for product state
// interface ProductNutrition {
//   calories: number;
//   fat: string;
//   carbs: string;
//   protein: string;
// }

// interface ProductData {
//   name: string;
//   category: string;
//   price: number;
//   salePrice: number;
//   stock: number;
//   unit: string;
//   description: string;
//   images: string[];
//   nutrition: ProductNutrition;
//   organic: boolean;
//   featured: boolean;
//   status: "draft" | "published";
// }

// // Define type for product categories
// interface Category {
//   id: number;
//   name: string;
// }

// export default function AddNewProductPage() {
//   const defaultCollapsed = {
//     order: true,
//     product: false,
//     finance: true,
//     store: true,
//   };

//   // Empty product state for new products
//   const [product, setProduct] = useState<ProductData>({
//     name: "",
//     category: "Fruits",
//     price: 0,
//     salePrice: 0,
//     stock: 0,
//     unit: "each",
//     description: "",
//     images: [],
//     nutrition: {
//       calories: 0,
//       fat: "0g",
//       carbs: "0g",
//       protein: "0g",
//     },
//     organic: false,
//     featured: false,
//     status: "draft",
//   });

//   // For tracking form completion
//   const [formProgress, setFormProgress] = useState({
//     basicInfo: false,
//     pricing: false,
//     images: false,
//     description: false,
//   });

//   // Function to handle form changes
//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value, type } = e.target;
//     const checked =
//       type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
//     setProduct({
//       ...product,
//       [name]: type === "checkbox" ? checked : value,
//     });

//     // Update form progress
//     if (name === "name" && value.trim() !== "") {
//       setFormProgress((prev) => ({ ...prev, basicInfo: true }));
//     } else if ((name === "price" || name === "stock") && Number(value) > 0) {
//       setFormProgress((prev) => ({ ...prev, pricing: true }));
//     } else if (name === "description" && value.trim().length > 10) {
//       setFormProgress((prev) => ({ ...prev, description: true }));
//     }
//   };

//   // For handling image uploads
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         if (event.target && event.target.result) {
//           const newImage = event.target.result as string;
//           setSelectedImage(newImage);

//           // Add to product images
//           setProduct((prev) => ({
//             ...prev,
//             images: [...prev.images, newImage],
//           }));

//           // Update form progress
//           setFormProgress((prev) => ({ ...prev, images: true }));
//         }
//       };
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   // Handle image removal
//   const handleRemoveImage = (index: number) => {
//     setProduct((prev) => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index),
//     }));

//     if (product.images.length <= 1) {
//       setFormProgress((prev) => ({ ...prev, images: false }));
//     }
//   };

//   // List of available categories
//   const categories: Category[] = [
//     { id: 1, name: "Fruits" },
//     { id: 2, name: "Vegetables" },
//     { id: 3, name: "Herbs" },
//     { id: 4, name: "Organic Bundles" },
//     { id: 5, name: "Fresh Juices" },
//     { id: 6, name: "Dried Fruits" },
//   ];

//   // Sample similar products
//   const similarProducts = [
//     {
//       id: 1,
//       name: "Organic Apples",
//       category: "Fruits",
//       price: 3.49,
//       image: "/api/placeholder/200/200",
//     },
//     {
//       id: 2,
//       name: "Fresh Broccoli",
//       category: "Vegetables",
//       price: 2.29,
//       image: "/api/placeholder/200/200",
//     },
//     {
//       id: 3,
//       name: "Organic Bananas",
//       category: "Fruits",
//       price: 1.99,
//       image: "/api/placeholder/200/200",
//     },
//   ];

//   // Calculate overall form completion percentage
//   const completionPercentage =
//     (Object.values(formProgress).filter(Boolean).length /
//       Object.values(formProgress).length) *
//     100;

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Here you would typically send the data to your API
//     console.log("Submitting product:", product);
//     // Example of what you might do after successful submission:
//     alert("Product successfully added!");
//     // Redirect or clear form, etc.
//   };

//   // Handle save as draft
//   const handleSaveAsDraft = () => {
//     console.log("Saving draft:", product);
//     alert("Product saved as draft!");
//   };

//   return (
//     <DashboardLayout
//       title="Add New Product"
//       breadcrumb="Products > Add New Product"
//       activePath="/seller-dashboard/add-product"
//       defaultCollapsed={defaultCollapsed}
//       notificationCount={3}
//       messageCount={2}
//     >
//       <div className="flex flex-col lg:flex-row gap-6 p-6 bg-white">
//         {/* Left side - Form */}
//         <div className="lg:w-2/3">
//           <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h1 className="text-2xl font-medium text-gray-800">
//                 Add New Product
//               </h1>

//               {/* Progress indicator */}
//               <div className="flex items-center">
//                 <div className="w-40 bg-gray-200 rounded-full h-2.5 mr-2">
//                   <div
//                     className="h-2.5 rounded-full"
//                     style={{
//                       width: `${completionPercentage}%`,
//                       backgroundColor: colors.primary,
//                     }}
//                   ></div>
//                 </div>
//                 <span className="text-sm text-gray-600">
//                   {Math.round(completionPercentage)}% complete
//                 </span>
//               </div>
//             </div>

//             {/* Form fields */}
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               {/* Basic Info Section */}
//               <div className="border-b border-gray-200 pb-6">
//                 <h2 className="text-lg font-medium text-gray-700 mb-4">
//                   Basic Information
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Product Name<span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={product.name}
//                       onChange={handleChange}
//                       className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-offset-0 focus:ring-opacity-50 focus:ring-green-500 focus:border-green-500"
//                       required
//                       placeholder="Enter product name"
//                     />
//                     <p className="mt-1 text-xs text-gray-500">
//                       Choose a descriptive and appealing name
//                     </p>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Category<span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       name="category"
//                       value={product.category}
//                       onChange={handleChange}
//                       className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                       required
//                     >
//                       {categories.map((category) => (
//                         <option key={category.id} value={category.name}>
//                           {category.name}
//                         </option>
//                       ))}
//                     </select>
//                     <p className="mt-1 text-xs text-gray-500">
//                       Select the most relevant category
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Pricing Section */}
//               <div className="border-b border-gray-200 pb-6">
//                 <h2 className="text-lg font-medium text-gray-700 mb-4">
//                   Pricing & Inventory
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Regular Price ($)<span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="number"
//                       name="price"
//                       value={product.price}
//                       onChange={handleChange}
//                       step="0.01"
//                       min="0"
//                       className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Sale Price ($)
//                     </label>
//                     <input
//                       type="number"
//                       name="salePrice"
//                       value={product.salePrice}
//                       onChange={handleChange}
//                       step="0.01"
//                       min="0"
//                       className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                     />
//                     <p className="mt-1 text-xs text-gray-500">
//                       Leave 0 if not on sale
//                     </p>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Unit
//                     </label>
//                     <select
//                       name="unit"
//                       value={product.unit}
//                       onChange={handleChange}
//                       className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                     >
//                       <option value="each">Each</option>
//                       <option value="lb">Pound (lb)</option>
//                       <option value="kg">Kilogram (kg)</option>
//                       <option value="bunch">Bunch</option>
//                       <option value="bag">Bag</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Stock Quantity<span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="number"
//                       name="stock"
//                       value={product.stock}
//                       onChange={handleChange}
//                       min="0"
//                       className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                       required
//                     />
//                   </div>

//                   <div className="md:col-span-2 flex items-center space-x-6 mt-6">
//                     <div className="flex items-center">
//                       <input
//                         type="checkbox"
//                         id="organic"
//                         name="organic"
//                         checked={product.organic}
//                         onChange={handleChange}
//                         className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
//                       />
//                       <label
//                         htmlFor="organic"
//                         className="ml-2 text-sm text-gray-700"
//                       >
//                         Organic Product
//                       </label>
//                     </div>

//                     <div className="flex items-center">
//                       <input
//                         type="checkbox"
//                         id="featured"
//                         name="featured"
//                         checked={product.featured}
//                         onChange={handleChange}
//                         className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
//                       />
//                       <label
//                         htmlFor="featured"
//                         className="ml-2 text-sm text-gray-700"
//                       >
//                         Featured Product
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Images Section */}
//               <div className="border-b border-gray-200 pb-6">
//                 <h2 className="text-lg font-medium text-gray-700 mb-4">
//                   Product Images<span className="text-red-500">*</span>
//                 </h2>

//                 <div>
//                   <div className="flex flex-wrap gap-4 mb-4">
//                     {product.images.map((image, index) => (
//                       <div key={index} className="relative">
//                         <img
//                           src={image.startsWith("/api") ? image : image}
//                           alt={`Product image ${index + 1}`}
//                           className="h-24 w-24 object-cover rounded-md border border-gray-200"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => handleRemoveImage(index)}
//                           className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs"
//                         >
//                           ×
//                         </button>
//                       </div>
//                     ))}

//                     {product.images.length === 0 && (
//                       <div className="h-24 w-24 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
//                         <span className="text-xs text-gray-500">No images</span>
//                       </div>
//                     )}
//                   </div>

//                   <label className="flex justify-center items-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-green-500 focus:outline-none">
//                     <div className="flex flex-col items-center space-y-2">
//                       <svg
//                         className="w-6 h-6 text-gray-400"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                         ></path>
//                       </svg>
//                       <span className="text-sm text-gray-500">
//                         Drop files to upload or{" "}
//                         <span className="text-green-600 underline">browse</span>
//                       </span>
//                       <span className="text-xs text-gray-500">
//                         PNG, JPG, GIF up to 10MB (Min. 1 image required)
//                       </span>
//                     </div>
//                     <input
//                       type="file"
//                       name="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={handleImageChange}
//                     />
//                   </label>
//                 </div>
//               </div>

//               {/* Description Section */}
//               <div className="border-b border-gray-200 pb-6">
//                 <h2 className="text-lg font-medium text-gray-700 mb-4">
//                   Description<span className="text-red-500">*</span>
//                 </h2>

//                 <div>
//                   <textarea
//                     name="description"
//                     value={product.description}
//                     onChange={handleChange}
//                     rows={4}
//                     className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                     placeholder="Describe your product's features, benefits, origin, etc."
//                     required
//                   ></textarea>
//                   <p className="mt-1 text-xs text-gray-500">
//                     Min. 10 characters
//                   </p>
//                 </div>
//               </div>

//               {/* Nutrition Facts */}
//               <div className="border-b border-gray-200 pb-6">
//                 <h2 className="text-lg font-medium text-gray-700 mb-4">
//                   Nutrition Facts
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Calories
//                     </label>
//                     <input
//                       type="number"
//                       name="nutrition.calories"
//                       value={product.nutrition.calories}
//                       onChange={(e) =>
//                         setProduct({
//                           ...product,
//                           nutrition: {
//                             ...product.nutrition,
//                             calories: Number(e.target.value),
//                           },
//                         })
//                       }
//                       className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Fat
//                     </label>
//                     <input
//                       type="text"
//                       name="nutrition.fat"
//                       value={product.nutrition.fat}
//                       onChange={(e) =>
//                         setProduct({
//                           ...product,
//                           nutrition: {
//                             ...product.nutrition,
//                             fat: e.target.value,
//                           },
//                         })
//                       }
//                       className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                       placeholder="e.g. 15g"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Carbs
//                     </label>
//                     <input
//                       type="text"
//                       name="nutrition.carbs"
//                       value={product.nutrition.carbs}
//                       onChange={(e) =>
//                         setProduct({
//                           ...product,
//                           nutrition: {
//                             ...product.nutrition,
//                             carbs: e.target.value,
//                           },
//                         })
//                       }
//                       className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                       placeholder="e.g. 9g"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Protein
//                     </label>
//                     <input
//                       type="text"
//                       name="nutrition.protein"
//                       value={product.nutrition.protein}
//                       onChange={(e) =>
//                         setProduct({
//                           ...product,
//                           nutrition: {
//                             ...product.nutrition,
//                             protein: e.target.value,
//                           },
//                         })
//                       }
//                       className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                       placeholder="e.g. 2g"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-500"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleSaveAsDraft}
//                   className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-500"
//                   style={{ backgroundColor: colors.secondary }}
//                 >
//                   Save Draft
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-500"
//                   style={{
//                     backgroundColor:
//                       formProgress.basicInfo &&
//                       formProgress.pricing &&
//                       formProgress.images &&
//                       formProgress.description
//                         ? colors.darkGreen
//                         : colors.primary,
//                   }}
//                   disabled={
//                     !formProgress.basicInfo ||
//                     !formProgress.pricing ||
//                     !formProgress.images ||
//                     !formProgress.description
//                   }
//                 >
//                   Add Product
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* Right side - Preview & Tips */}
//         <div className="lg:w-1/3">
//           {/* Product Preview */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
//             <h2 className="text-lg font-medium text-gray-700 mb-4">
//               Product Preview
//             </h2>

//             <div
//               className="border rounded-lg overflow-hidden"
//               style={{ backgroundColor: colors.paleGreen }}
//             >
//               <div className="aspect-w-1 aspect-h-1 w-full">
//                 {product.images.length > 0 ? (
//                   <img
//                     src={product.images[0]}
//                     alt={product.name || "Product preview"}
//                     className="object-cover w-full h-64"
//                   />
//                 ) : (
//                   <div className="w-full h-64 flex items-center justify-center bg-gray-100">
//                     <p className="text-gray-400">
//                       Product image will appear here
//                     </p>
//                   </div>
//                 )}
//               </div>

//               <div className="p-4">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="text-lg font-medium text-gray-800">
//                       {product.name || "Product Name"}
//                     </h3>
//                     <p className="text-sm text-gray-500">{product.category}</p>
//                   </div>

//                   {product.organic && (
//                     <span
//                       className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
//                       style={{
//                         backgroundColor: colors.paleGreen,
//                         color: colors.darkGreen,
//                       }}
//                     >
//                       Organic
//                     </span>
//                   )}
//                 </div>

//                 <div className="mt-4 flex items-end">
//                   {product.salePrice > 0 ? (
//                     <>
//                       <p className="text-xl font-medium text-gray-900">
//                         ${product.salePrice.toFixed(2)}
//                       </p>
//                       <p className="text-sm line-through text-gray-500 ml-2">
//                         ${product.price.toFixed(2)}
//                       </p>
//                     </>
//                   ) : (
//                     <p className="text-xl font-medium text-gray-900">
//                       {product.price > 0
//                         ? `$${product.price.toFixed(2)}`
//                         : "Price not set"}
//                     </p>
//                   )}
//                   <p className="text-sm text-gray-500 ml-2">/ {product.unit}</p>
//                 </div>

//                 <div className="mt-4">
//                   <p className="text-sm text-gray-600 line-clamp-3">
//                     {product.description ||
//                       "Product description will appear here"}
//                   </p>
//                 </div>

//                 <div className="mt-4 flex justify-between items-center">
//                   <div className="text-sm text-gray-500">
//                     {product.stock > 0
//                       ? `In stock: ${product.stock}`
//                       : "Out of stock"}
//                   </div>
//                   <button
//                     className="px-4 py-2 text-sm font-medium text-white rounded-md"
//                     style={{ backgroundColor: colors.primary }}
//                     disabled={!product.name}
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Tips & Similar Products */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
//             <h2 className="text-lg font-medium text-gray-700 mb-4">
//               Tips for Better Products
//             </h2>

//             <div className="space-y-4">
//               <div className="flex items-start">
//                 <div
//                   className="flex-shrink-0 p-1.5 bg-green-100 rounded-full"
//                   style={{ backgroundColor: colors.paleGreen }}
//                 >
//                   <svg
//                     className="w-5 h-5 text-green-800"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                     style={{ color: colors.darkGreen }}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     ></path>
//                   </svg>
//                 </div>
//                 <p className="ml-3 text-sm text-gray-600">
//                   Use high-quality images from multiple angles to showcase your
//                   product.
//                 </p>
//               </div>

//               <div className="flex items-start">
//                 <div
//                   className="flex-shrink-0 p-1.5 bg-green-100 rounded-full"
//                   style={{ backgroundColor: colors.paleGreen }}
//                 >
//                   <svg
//                     className="w-5 h-5 text-green-800"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                     style={{ color: colors.darkGreen }}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     ></path>
//                   </svg>
//                 </div>
//                 <p className="ml-3 text-sm text-gray-600">
//                   Write detailed descriptions highlighting freshness, origin,
//                   and health benefits.
//                 </p>
//               </div>

//               <div className="flex items-start">
//                 <div
//                   className="flex-shrink-0 p-1.5 bg-green-100 rounded-full"
//                   style={{ backgroundColor: colors.paleGreen }}
//                 >
//                   <svg
//                     className="w-5 h-5 text-green-800"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                     style={{ color: colors.darkGreen }}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     ></path>
//                   </svg>
//                 </div>
//                 <p className="ml-3 text-sm text-gray-600">
//                   Always include complete nutrition information to help
//                   health-conscious customers.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Similar Products */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
//             <h2 className="text-lg font-medium text-gray-700 mb-4">
//               Similar Products
//             </h2>

//             <div className="space-y-4">
//               {similarProducts.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex items-center p-3 border rounded-lg hover:bg-gray-50"
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded-md"
//                   />
//                   <div className="ml-4 flex-1">
//                     <h3 className="text-sm font-medium text-gray-800">
//                       {item.name}
//                     </h3>
//                     <p className="text-xs text-gray-500">{item.category}</p>
//                   </div>
//                   <div className="text-sm font-medium text-gray-900">
//                     ${item.price.toFixed(2)}
//                   </div>
//                 </div>
//               ))}

//               <button
//                 className="w-full py-2 text-sm text-center text-white rounded-md"
//                 style={{ backgroundColor: colors.secondary }}
//               >
//                 View All Similar Products
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }
