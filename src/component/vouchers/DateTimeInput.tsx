import React from "react";

interface DateTimeInputProps {
  dateId: string;
  dateName: string;
  dateValue: string;
  timeId: string;
  timeName: string;
  timeValue: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}

export const DateTimeInput: React.FC<DateTimeInputProps> = ({
  dateId,
  dateName,
  dateValue,
  timeId,
  timeName,
  timeValue,
  label,
  onChange,
  required = false,
  error,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={dateId} className="block text-sm font-medium text-gray-700 mb-1">
        {label}{required && "*"}
      </label>
      <div className="flex space-x-2">
        <div className="flex-1">
          <input
            type="date"
            id={dateId}
            name={dateName}
            value={dateValue}
            onChange={onChange}
            className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-[#2E8B57]`}
          />
        </div>
        <div className="flex-1">
          <input
            type="time"
            id={timeId}
            name={timeName}
            value={timeValue}
            onChange={onChange}
            className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-[#2E8B57]`}
          />
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};