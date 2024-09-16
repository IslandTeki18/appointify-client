import * as React from "react";

type InputVariant = "primary" | "secondary" | "outlined";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  label?: string;
  id?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  variant = "primary",
  label,
  className = "",
  id,
  required = false,
  ...props
}) => {
  const baseClasses =
    "px-3 py-2 rounded-md focus:outline-none focus:ring-2 transition-colors";

  const variantClasses = {
    primary:
      "border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400",
    secondary:
      "bg-gray-100 border-transparent focus:bg-white focus:border-gray-300 focus:ring-gray-300 dark:bg-gray-800 dark:focus:bg-gray-700 dark:focus:border-gray-600 dark:focus:ring-gray-600 dark:text-white",
    outlined:
      "bg-transparent border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <div className="flex flex-col">
      {label && (
        <div className="flex items-center gap-1">
          <label
            htmlFor={id}
            className="mb-1 font-medium text-gray-700 dark:text-gray-200"
            >
            {label}
          </label>
            {required && <span className="text-red-500">*</span>}
        </div>
      )}
      <input className={combinedClasses} {...props} />
    </div>
  );
};
