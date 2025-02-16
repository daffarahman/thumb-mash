import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
}

const Button: React.FC<ButtonProps> = ({ variant = "primary", className, ...props }) => {
  const baseStyles = "relative px-6 py-2 font-semibold rounded-lg transition-all";
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    tertiary: "bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-100",
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
