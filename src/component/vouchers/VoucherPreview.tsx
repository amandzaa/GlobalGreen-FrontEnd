import React from "react";
import { format } from "date-fns";

interface VoucherPreviewProps {
  formData: {
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
    status: string;
  };
}

export const VoucherPreview: React.FC<VoucherPreviewProps> = ({ formData }) => {
  // Format dates for display
  const formatDateTime = (date: string, time: string) => {
    if (!date) return "";
    try {
      const dateTime = new Date(`${date}T${time || "00:00"}`);
      return format(dateTime, "MMMM d, yyyy 'at' h:mm a");
    } catch {
      return "";
    }
  };

  return (
    <div className="mt-8 border-t border-gray-200 pt-6">
      <h3 className="text-lg font-medium text-[var(--color-darkGreen)] mb-4">
        Voucher Preview
      </h3>
      
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* Voucher Header */}
        <div className="bg-[var(--color-primary)] p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-xl font-bold">{formData.title || "Voucher Title"}</h4>
              <p className="text-sm opacity-90">{formData.code ? `Code: ${formData.code}` : "Code: EXAMPLE"}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold">
                {formData.discountType === "percentage" 
                  ? `${formData.discountValue || "0"}%` 
                  : `$${formData.discountValue || "0"}`}
              </span>
              <p className="text-sm opacity-90">
                {formData.discountType === "percentage" ? "off" : "discount"}
              </p>
            </div>
          </div>
        </div>
        
        {/* Voucher Body */}
        <div className="p-4">
          {/* Description */}
          {formData.description && (
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700">Description</h5>
              <p className="text-sm text-gray-600">{formData.description}</p>
            </div>
          )}
          
          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm font-medium text-gray-700">Valid From</h5>
              <p className="text-sm text-gray-600">
                {formatDateTime(formData.startDate, formData.startTime) || "Not specified"}
              </p>
            </div>
            <div>
              <h5 className="text-sm font-medium text-gray-700">Valid Until</h5>
              <p className="text-sm text-gray-600">
                {formatDateTime(formData.endDate, formData.endTime) || "Not specified"}
              </p>
            </div>
            <div>
              <h5 className="text-sm font-medium text-gray-700">Minimum Purchase</h5>
              <p className="text-sm text-gray-600">
                {formData.minPurchaseAmount ? `$${formData.minPurchaseAmount}` : "No minimum"}
              </p>
            </div>
            <div>
              <h5 className="text-sm font-medium text-gray-700">Usage Limit</h5>
              <p className="text-sm text-gray-600">
                {formData.maxUsage ? `${formData.maxUsage} uses` : "Unlimited"}
              </p>
            </div>
            <div>
              <h5 className="text-sm font-medium text-gray-700">Products</h5>
              <p className="text-sm text-gray-600">
                {formData.productScope === "all" ? "All products" : "Selected products only"}
              </p>
            </div>
            <div>
              <h5 className="text-sm font-medium text-gray-700">Status</h5>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                formData.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : formData.status === 'inactive' 
                  ? 'bg-gray-100 text-gray-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
        
        {/* Voucher Footer */}
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            This is a preview of how your voucher will appear to customers. The actual appearance may vary.
          </p>
        </div>
      </div>
    </div>
  );
};