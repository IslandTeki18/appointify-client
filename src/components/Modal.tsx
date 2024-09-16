import * as React from "react";
import { useEffect, useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "danger";
};

const variantStyles = {
  primary: "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100",
  secondary: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100",
  success: "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100",
  danger: "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100",
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  variant = "primary",
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      return setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 1000); // 300ms matches the transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  return (
    <div
      className={`fixed inset-0 z-10 overflow-y-auto transition-opacity duration-1000 ease-out ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className={`absolute inset-0 bg-gray-500 ${
              isOpen ? "opacity-75" : "opacity-0"
            } transition-opacity duration-300 ease-out`}
          ></div>
        </div>

        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className={`inline-block align-bottom rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all duration-300 ease-out sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 ${
            variantStyles[variant]
          } ${
            isOpen
              ? "translate-y-0 opacity-100 sm:scale-100"
              : "translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
          }`}
        >
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium" id="modal-title">
                {title}
              </h3>
              <div className="mt-2">{children}</div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${
                variant === "primary"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : variant === "secondary"
                  ? "bg-gray-600 hover:bg-gray-700"
                  : variant === "success"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                variant === "primary"
                  ? "focus:ring-blue-500"
                  : variant === "secondary"
                  ? "focus:ring-gray-500"
                  : variant === "success"
                  ? "focus:ring-green-500"
                  : "focus:ring-red-500"
              }`}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
