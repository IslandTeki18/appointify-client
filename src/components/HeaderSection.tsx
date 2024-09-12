import * as React from "react";

type HeaderSectionVariant = "primary" | "secondary" | "success" | "danger";

type HeaderSectionProps = {
  title: string;
  desc: string;
  variant?: HeaderSectionVariant;
};

const variantClasses: Record<HeaderSectionVariant, string> = {
  primary: "bg-blue-600 text-white",
  secondary: "bg-gray-800 text-white",
  success: "bg-green-600 text-white",
  danger: "bg-red-600 text-white",
};

export const HeaderSection = ({
  title,
  desc,
  variant = "primary",
}: HeaderSectionProps) => {
  return (
    <div className={`py-24 sm:py-32 ${variantClasses[variant]}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8">{desc}</p>
        </div>
      </div>
    </div>
  );
};
