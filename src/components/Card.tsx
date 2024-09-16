import * as React from "react";

type CardProps = {
  variant?: "primary" | "secondary" | "success" | "danger";
  children: React.ReactNode;
};

const variantStyles = {
  primary:
    "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 border-blue-300 dark:border-blue-600",
  secondary:
    "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600",
  success:
    "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 border-green-300 dark:border-green-600",
  danger:
    "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 border-red-300 dark:border-red-600",
};

export const Card: React.FC<CardProps> = ({
  variant = "primary",
  children,
}) => {
  return (
    <div
      className={`max-w-sm rounded overflow-hidden shadow-lg ${variantStyles[variant]} border`}
    >
      <div className="px-6 py-4">
       {children}
      </div>
    </div>
  );
};
