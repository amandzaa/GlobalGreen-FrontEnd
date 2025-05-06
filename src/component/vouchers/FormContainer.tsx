import React, { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
}

export const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>;
};
