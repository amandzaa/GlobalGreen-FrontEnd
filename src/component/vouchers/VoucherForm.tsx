import React, { useState } from "react";
import { FormLayout } from "./FormLayout";
import { FormContainer } from "./FormContainer";
import { FormSection } from "./FormSection";
import { FormInput } from "./FormInput";
import { FormTextArea } from "./FormTextArea";
import { FormSelect } from "./FormSelect";
import { DateTimeInput } from "./DateTimeInput";
import { VoucherPreview } from "./VoucherPreview";
import { VoucherTips } from "./VoucherTips";
import { ProductSelection } from "./ProductSelection";

import { sampleproducts } from "@/data/sampleProducts";

export interface VoucherFormData {
  code: string;
  title: string;
  description: string;
  discountType: string;
  discountValue: string;
  minPurchaseAmount: string;
  maxUsage: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  productScope: string;
  specificProducts: string[]; // Array of product IDs
  status: string;
}

interface VoucherFormProps {
  initialData?: VoucherFormData;
  onSubmit: (formData: VoucherFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export const VoucherForm: React.FC<VoucherFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  // Default form values
  const defaultFormData: VoucherFormData = {
    code: "",
    title: "",
    description: "",
    discountType: "percentage", // or "fixed"
    discountValue: "",
    minPurchaseAmount: "",
    maxUsage: "",
    startDate: "",
    startTime: "00:00", // Default start time
    endDate: "",
    endTime: "23:59", // Default end time
    productScope: "all", // or "specific"
    specificProducts: [],
    status: "active", // or "inactive", "scheduled"
  };

  // Form state
  const [formData, setFormData] = useState<VoucherFormData>(initialData || defaultFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleProductsChange = (selectedProducts: string[]) => {
    setFormData({
      ...formData,
      specificProducts: selectedProducts,
    });
    
    // Clear any product selection error
    if (errors.specificProducts) {
      setErrors({
        ...errors,
        specificProducts: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Basic validation rules
    if (!formData.code.trim()) {
      newErrors.code = "Voucher code is required";
    } else if (formData.code.length < 3) {
      newErrors.code = "Code must be at least 3 characters";
    }
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.discountValue) {
      newErrors.discountValue = "Discount value is required";
    } else if (formData.discountType === "percentage" && (parseFloat(formData.discountValue) <= 0 || parseFloat(formData.discountValue) > 100)) {
      newErrors.discountValue = "Percentage must be between 0 and 100";
    } else if (formData.discountType === "fixed" && parseFloat(formData.discountValue) <= 0) {
      newErrors.discountValue = "Discount amount must be greater than 0";
    }
    
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }
    
    if (!formData.startTime) {
      newErrors.startTime = "Start time is required";
    }
    
    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }
    
    if (!formData.endTime) {
      newErrors.endTime = "End time is required";
    }
    
    // Compare full datetime (date + time)
    if (formData.startDate && formData.endDate && formData.startTime && formData.endTime) {
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
      
      if (endDateTime <= startDateTime) {
        newErrors.endDate = "End date and time must be after start date and time";
      }
    }
    
    // Validate specific products if that scope is selected
    if (formData.productScope === "specific" && formData.specificProducts.length === 0) {
      newErrors.specificProducts = "At least one product must be selected";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <>
      <FormLayout
        title={isEditing ? "Edit Voucher" : "Create New Voucher"}
        onSubmit={handleSubmit}
        handleCancel={onCancel}
        showPreview={showPreview}
        setShowPreview={setShowPreview}
        isEditing={isEditing}
      >
        <FormContainer>
          {/* Left Column */}
          <div className="space-y-6">
            {/* Voucher Basic Information */}
            <FormSection title="Basic Information">
              <FormInput
                id="code"
                name="code"
                label="Voucher Code"
                value={formData.code}
                onChange={handleInputChange}
                placeholder="e.g. FRESH25"
                required
                error={errors.code}
              />
              
              <FormInput
                id="title"
                name="title"
                label="Title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Summer Discount"
                required
                error={errors.title}
              />
              
              <FormTextArea
                id="description"
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your voucher"
              />
            </FormSection>
            
            {/* Discount Settings */}
            <FormSection title="Discount Settings">
              <FormSelect
                id="discountType"
                name="discountType"
                label="Discount Type"
                value={formData.discountType}
                onChange={handleInputChange}
                options={[
                  { value: "percentage", label: "Percentage (%)" },
                  { value: "fixed", label: "Fixed Amount ($)" },
                ]}
                required
              />
              
              <FormInput
                id="discountValue"
                name="discountValue"
                label={formData.discountType === "percentage" ? "Discount Percentage (%)" : "Discount Amount ($)"}
                value={formData.discountValue}
                onChange={handleInputChange}
                placeholder={formData.discountType === "percentage" ? "e.g. 15" : "e.g. 10.99"}
                type="number"
                required
                error={errors.discountValue}
                min={0}
                max={formData.discountType === "percentage" ? 100 : undefined}
                step="0.01"
              />
            </FormSection>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Voucher Usage Settings */}
            <FormSection title="Usage Settings">
              <FormInput
                id="minPurchaseAmount"
                name="minPurchaseAmount"
                label="Minimum Purchase Amount ($)"
                value={formData.minPurchaseAmount}
                onChange={handleInputChange}
                placeholder="e.g. 50.00"
                type="number"
                min={0}
                step="0.01"
              />
              
              <FormInput
                id="maxUsage"
                name="maxUsage"
                label="Maximum Usage"
                value={formData.maxUsage}
                onChange={handleInputChange}
                placeholder="Leave blank for unlimited"
                type="number"
                min={1}
              />
            </FormSection>
            
            {/* Voucher Period */}
            <FormSection title="Validity Period">
              <DateTimeInput
                dateId="startDate"
                dateName="startDate"
                dateValue={formData.startDate}
                timeId="startTime"
                timeName="startTime"
                timeValue={formData.startTime}
                label="Start Date & Time"
                onChange={handleInputChange}
                required
                error={errors.startDate || errors.startTime}
              />
              
              <DateTimeInput
                dateId="endDate"
                dateName="endDate"
                dateValue={formData.endDate}
                timeId="endTime"
                timeName="endTime"
                timeValue={formData.endTime}
                label="End Date & Time"
                onChange={handleInputChange}
                required
                error={errors.endDate || errors.endTime}
              />
            </FormSection>
            
            {/* Product Scope */}
            <FormSection title="Product Scope" noBorder>
              <FormSelect
                id="productScope"
                name="productScope"
                label="Apply to"
                value={formData.productScope}
                onChange={handleInputChange}
                options={[
                  { value: "all", label: "All Products" },
                  { value: "specific", label: "Specific Products" },
                ]}
              />
              
              {formData.productScope === "specific" && (
                <div className="mb-4">
                  <p className="block text-sm font-medium text-gray-700 mb-1">
                    Select Products
                  </p>
                  <div className="border border-gray-300 rounded-md p-4 bg-white">
                    {/* Using the imported ProductSelection component */}
                    <ProductSelection 
                      selectedProducts={formData.specificProducts}
                      onProductsChange={handleProductsChange}
                      products={sampleproducts} // Pass the imported product data
                      error={errors.specificProducts}
                    />
                  </div>
                </div>
              )}
            </FormSection>
          </div>
        </FormContainer>
        
        {/* Status Selection */}
        <div className="mt-6 border-t border-gray-200 pt-6">
          <FormSelect
            id="status"
            name="status"
            label="Voucher Status"
            value={formData.status}
            onChange={handleInputChange}
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
              { value: "scheduled", label: "Scheduled" },
            ]}
            className="w-full max-w-xs"
          />
        </div>
        
        {/* Voucher Preview */}
        {showPreview && <VoucherPreview formData={formData} />}
      </FormLayout>
      
      {/* Tips Section */}
      <VoucherTips />
    </>
  );
};