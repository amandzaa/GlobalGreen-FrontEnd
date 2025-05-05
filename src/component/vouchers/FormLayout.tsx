import React, { ReactNode } from "react";

interface FormLayoutProps {
  children: ReactNode;
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  handleCancel: () => void;
  showPreview?: boolean;
  setShowPreview?: (value: boolean) => void;
  isEditing?: boolean;
}

export const FormLayout: React.FC<FormLayoutProps> = ({
  children,
  title,
  onSubmit,
  handleCancel,
  showPreview = false,
  setShowPreview,
  isEditing = false,
}) => {
  return (
    <div className="bg-[#E6F4EA] min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-sm border border-[#E6F4EA] p-6 mb-6">
        <h2 className="text-xl font-semibold text-[#20603D] mb-6">
          {title}
        </h2>

        <form onSubmit={onSubmit}>
          {children}
          
          {/* Form Actions */}
          <div className="mt-8 flex items-center justify-end space-x-4">
            {setShowPreview && (
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="px-6 py-2 border border-[#2E8B57] rounded-md text-sm font-medium text-[#2E8B57] hover:bg-[#E6F4EA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E8B57]"
              >
                {showPreview ? "Hide Preview" : "Preview Voucher"}
              </button>
            )}
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E8B57]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#3474B4] rounded-md text-sm font-medium text-white hover:bg-[#2A5D91] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3474B4]"
            >
              {isEditing ? "Update Voucher" : "Create Voucher"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};