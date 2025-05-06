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
    <div className="bg-[var(--color-paleGreen)] min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-sm border border-[var(--color-paleGreen)] p-6 mb-6">
        <h2 className="text-xl font-semibold text-[var(--color-darkGreen)] mb-6">
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
                className="px-6 py-2 border border-[var(--color-primary)] rounded-md text-sm font-medium text-[var(--color-primary)] hover:bg-[var(--color-paleGreen)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]"
              >
                {showPreview ? "Hide Preview" : "Preview Voucher"}
              </button>
            )}
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[var(--color-accent)] rounded-md text-sm font-medium text-white hover:bg-[#2A5D91] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-accent)]"
            >
              {isEditing ? "Update Voucher" : "Create Voucher"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};