// ProfileField.tsx - Reusable field component with inline editing capability
import React, { useState } from "react";
import { Edit2, Check, X } from "lucide-react";

interface ProfileFieldProps {
  label: string;
  value: string;
  field: string;
  editable?: boolean;
  onEdit?: (field: string, value: string) => void;
  isLoading?: boolean;
  variant?: "default" | "compact";
}

export const ProfileField: React.FC<ProfileFieldProps> = ({
  label,
  value,
  field,
  editable = true,
  onEdit,
  isLoading = false,
  variant = "default",
}) => {
  const [isInlineEditing, setIsInlineEditing] = useState(false);
  const [inlineValue, setInlineValue] = useState(value);
  
  const handleEditClick = () => {
    if (onEdit && !isInlineEditing) {
      onEdit(field, value);
    } else {
      setIsInlineEditing(true);
      setInlineValue(value);
    }
  };
  
  const handleInlineSave = () => {
    if (onEdit) {
      onEdit(field, inlineValue);
    }
    setIsInlineEditing(false);
  };
  
  const handleInlineCancel = () => {
    setIsInlineEditing(false);
    setInlineValue(value);
  };
  
  if (variant === "compact") {
    return (
      <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
        <span className="text-sm text-gray-500">{label}</span>
        <div className="flex items-center">
          {isInlineEditing ? (
            <div className="flex items-center">
              <input
                type="text"
                value={inlineValue}
                onChange={(e) => setInlineValue(e.target.value)}
                className="px-2 py-1 border rounded text-sm w-32 mr-2"
                autoFocus
              />
              <button 
                onClick={handleInlineSave}
                className="text-green-500 hover:text-green-700 mr-1"
              >
                <Check size={16} />
              </button>
              <button 
                onClick={handleInlineCancel}
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <>
              <span className="text-sm font-medium mr-3">{value || "—"}</span>
              {editable && onEdit && (
                <button 
                  onClick={handleEditClick}
                  className="text-gray-400 hover:text-primary"
                  disabled={isLoading}
                >
                  <Edit2 size={14} />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        {editable && onEdit && !isInlineEditing && (
          <button
            onClick={handleEditClick}
            className="text-xs text-primary hover:text-primary-dark flex items-center"
            disabled={isLoading}
          >
            <Edit2 size={12} className="mr-1" />
            Edit
          </button>
        )}
      </div>
      
      {isInlineEditing ? (
        <div className="flex items-center">
          <input
            type="text"
            value={inlineValue}
            onChange={(e) => setInlineValue(e.target.value)}
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
          <button 
            onClick={handleInlineSave}
            className="ml-2 p-2 text-green-500 hover:text-green-700"
          >
            <Check size={18} />
          </button>
          <button 
            onClick={handleInlineCancel}
            className="ml-1 p-2 text-red-500 hover:text-red-700"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <div className="p-2 bg-gray-50 rounded-md">
          <p className="text-gray-700">{value || "—"}</p>
        </div>
      )}
    </div>
  );
};