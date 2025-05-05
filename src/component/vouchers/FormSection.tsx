import React, { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
  noBorder?: boolean;
}

export const FormSection: React.FC<FormSectionProps> = ({ 
  title, 
  children,
  noBorder = false
}) => {
  return (
    <div className={`${noBorder ? "" : "border-b border-gray-200"} pb-6`}>
      <h3 className="text-lg font-medium text-[var(--color-darkGreen)] mb-4">{title}</h3>
      {children}
    </div>
  );
};