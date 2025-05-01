// components/VoucherForm.tsx
import React, { useState } from "react";
import { Calendar, Tag, Percent, ShoppingCart, Leaf, Apple, Carrot } from "lucide-react";

type VoucherFormProps = {
  onSubmit: (formData: any) => void;
  onCancel: () => void;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
};

type ProductCategory = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

const VoucherForm: React.FC<VoucherFormProps> = ({
  onSubmit,
  onCancel,
  primaryColor = "#2E8B57",
  secondaryColor = "#87CEEB",
  accentColor = "#3474B4",
}) => {
  const [formData, setFormData] = useState({
    voucherName: "",
    voucherCode: "",
    discountType: "percentage",
    discountValue: "",
    minPurchase: "",
    maxDiscount: "",
    startDate: "",
    endDate: "",
    categories: [] as string[],
    usageLimit: "unlimited",
    usageLimitValue: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const fruitVeggieCategories: ProductCategory[] = [
    { id: "organic-fruits", name: "Organic Fruits", icon: <Apple size={16} /> },
    { id: "organic-vegetables", name: "Organic Vegetables", icon: <Carrot size={16} /> },
    { id: "seasonal-produce", name: "Seasonal Produce", icon: <Leaf size={16} /> },
    { id: "fresh-salads", name: "Fresh Salad Kits", icon: <Leaf size={16} /> },
    { id: "fruit-baskets", name: "Fruit Baskets", icon: <ShoppingCart size={16} /> },
    { id: "veggie-boxes", name: "Veggie Boxes", icon: <ShoppingCart size={16} /> },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is modified
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFormData((prev) => {
      const updatedCategories = prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId];
      
      return { ...prev, categories: updatedCategories };
    });
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.voucherName.trim()) errors.voucherName = "Voucher name is required";
    if (!formData.voucherCode.trim()) errors.voucherCode = "Voucher code is required";
    if (!formData.discountValue.trim()) errors.discountValue = "Discount value is required";
    if (!formData.startDate.trim()) errors.startDate = "Start date is required";
    if (!formData.endDate.trim()) errors.endDate = "End date is required";
    
    if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
      errors.endDate = "End date must be after start date";
    }
    
    if (formData.usageLimit === "limited" && !formData.usageLimitValue.trim()) {
      errors.usageLimitValue = "Usage limit value is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Voucher Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="voucherName"
                value={formData.voucherName}
                onChange={handleChange}
                placeholder="e.g. Summer Fruits Special"
                className={`w-full px-4 py-2 rounded-md border ${
                  formErrors.voucherName ? "border-red-400" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-green-600`}
              />
              {formErrors.voucherName && (
                <p className="mt-1 text-sm text-red-500">{formErrors.voucherName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center">
                <Tag size={16} className="mr-1 text-green-600" />
                Voucher Code
              </div>
            </label>
            <input
              type="text"
              name="voucherCode"
              value={formData.voucherCode}
              onChange={handleChange}
              placeholder="e.g. SUMMER25"
              className={`w-full px-4 py-2 rounded-md border ${
                formErrors.voucherCode ? "border-red-400" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-green-600`}
            />
            {formErrors.voucherCode && (
              <p className="mt-1 text-sm text-red-500">{formErrors.voucherCode}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center">
                <Percent size={16} className="mr-1 text-green-600" />
                Discount Type & Value
              </div>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <select
                name="discountType"
                value={formData.discountType}
                onChange={handleChange}
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-green-600"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount ($)</option>
              </select>
              <input
                type="number"
                name="discountValue"
                value={formData.discountValue}
                onChange={handleChange}
                placeholder={formData.discountType === "percentage" ? "e.g. 15" : "e.g. 5.00"}
                min="0"
                className={`px-4 py-2 rounded-md border ${
                  formErrors.discountValue ? "border-red-400" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-green-600`}
              />
            </div>
            {formErrors.discountValue && (
              <p className="mt-1 text-sm text-red-500">{formErrors.discountValue}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Purchase ($)
              </label>
              <input
                type="number"
                name="minPurchase"
                value={formData.minPurchase}
                onChange={handleChange}
                placeholder="e.g. 20.00"
                min="0"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-green-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Discount ($)
              </label>
              <input
                type="number"
                name="maxDiscount"
                value={formData.maxDiscount}
                onChange={handleChange}
                placeholder="e.g. 10.00"
                min="0"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-green-600"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1 text-green-600" />
                Validity Period
              </div>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-md border ${
                    formErrors.startDate ? "border-red-400" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-green-600`}
                />
                {formErrors.startDate && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.startDate}</p>
                )}
              </div>
              <div>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-md border ${
                    formErrors.endDate ? "border-red-400" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-green-600`}
                />
                {formErrors.endDate && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.endDate}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center">
                <Leaf size={16} className="mr-1 text-green-600" />
                Product Categories
              </div>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {fruitVeggieCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryToggle(category.id)}
                  className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                    formData.categories.includes(category.id)
                      ? "bg-sky-100 border border-green-600"
                      : "bg-gray-100 hover:bg-gray-200 border border-transparent"
                  }`}
                >
                  <div className={`mr-2 text-sm ${formData.categories.includes(category.id) ? "text-green-600" : "text-gray-600"}`}>
                    {category.icon}
                  </div>
                  <span className="text-sm">{category.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usage Limit
            </label>
            <div className="grid grid-cols-2 gap-3">
              <select
                name="usageLimit"
                value={formData.usageLimit}
                onChange={handleChange}
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-green-600"
              >
                <option value="unlimited">Unlimited</option>
                <option value="limited">Limited Usage</option>
              </select>
              <input
                type="number"
                name="usageLimitValue"
                value={formData.usageLimitValue}
                onChange={handleChange}
                placeholder="e.g. 100 redemptions"
                min="1"
                disabled={formData.usageLimit !== "limited"}
                className={`px-4 py-2 rounded-md border ${
                  formErrors.usageLimitValue ? "border-red-400" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-green-600 ${
                  formData.usageLimit !== "limited" ? "bg-gray-100" : ""
                }`}
              />
            </div>
            {formErrors.usageLimitValue && (
              <p className="mt-1 text-sm text-red-500">{formErrors.usageLimitValue}</p>
            )}
          </div>
        </div>
      </div>

      {/* Full Width */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description (Optional)
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the voucher and its terms..."
          rows={3}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-green-600"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 focus:ring-green-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 focus:ring-green-600"
        >
          Create Voucher
        </button>
      </div>
    </form>
  );
};

export default VoucherForm;