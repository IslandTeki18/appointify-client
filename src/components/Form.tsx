import * as React from "react";
import { ReactNode } from "react";

interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  variant?: "primary" | "secondary" | "success" | "danger";
  darkMode?: boolean;
  className?: string;
}

export const Form: React.FC<FormProps> = ({
  onSubmit,
  children,
  variant = "primary",
  darkMode = false,
  className = "",
}) => {
  const baseClasses = "p-6 rounded-lg transition-colors duration-200";

  const variantClasses = {
    primary: darkMode
      ? "bg-gray-800 text-white"
      : "bg-white text-gray-900 shadow-md",
    secondary: darkMode
      ? "bg-gray-700 text-white"
      : "bg-gray-100 text-gray-900",
    success: darkMode
      ? "bg-green-800 text-white"
      : "bg-green-50 text-green-900",
    danger: darkMode ? "bg-red-800 text-white" : "bg-red-50 text-red-900",
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`${className} ${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </form>
  );
};
