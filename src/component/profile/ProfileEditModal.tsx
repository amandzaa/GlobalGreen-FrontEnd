import React, { useState, useEffect } from "react";
import { X, Save, Loader } from "lucide-react";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  field: string;
  value: string;
  onSave: (field: string, value: string) => void;
  isLoading?: boolean;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  field,
  value,
  onSave,
  isLoading = false,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState<string | null>(null);

  // Reset input value when modal opens with new field
  useEffect(() => {
    setInputValue(value);
    setError(null);
  }, [value, isOpen]);

  // Handle the form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!inputValue.trim()) {
      setError(`${getFieldLabel(field)} cannot be empty`);
      return;
    }
    
    // Field-specific validation
    if (field === "email" && !validateEmail(inputValue)) {
      setError("Please enter a valid email address");
      return;
    }
    
    if (field === "phone" && !validatePhone(inputValue)) {
      setError("Please enter a valid phone number");
      return;
    }
    
    // Clear any errors and save
    setError(null);
    onSave(field, inputValue);
  };

  // Email validation
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Phone validation
  const validatePhone = (phone: string): boolean => {
    const re = /^\+?[0-9]{10,15}$/;
    return re.test(phone.replace(/\s+/g, ''));
  };

  // Get human-readable field label
  const getFieldLabel = (fieldName: string): string => {
    const fieldLabels: Record<string, string> = {
      first_name: "First Name",
      last_name: "Last Name",
      email: "Email Address",
      phone: "Phone Number",
      username: "Username",
      fullName: "Full Name",
      birthday: "Birthday",
      address: "Address",
      github: "GitHub Profile",
      slack: "Slack Handle",
      office: "Office Location",
    };
    
    return fieldLabels[fieldName] || fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/_/g, ' ');
  };

  // Render input field based on field type
  const renderInputField = () => {
    switch (field) {
      case "birthday":
        return (
          <input
            type="date"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        );
      
      case "address":
        return (
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            rows={3}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        );
      default:
        return (
          <input
            type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit {getFieldLabel(field)}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getFieldLabel(field)}
            </label>
            {renderInputField()}
            {error && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
          </div>
          
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader size={16} className="animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  Save
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};