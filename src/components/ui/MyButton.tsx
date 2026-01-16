import { Loader2 } from "lucide-react";
import React from "react";

/* -------------------- Types -------------------- */

export type ButtonVariant = "primary" | "secondary";

export interface MyButtonProps {
  buttonText: string;
  isLoading?: boolean;
  loadingText?: string;
  variant?: ButtonVariant;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

/* -------------------- Component -------------------- */

const MyButton = ({
  buttonText,
  onClick,
  isLoading,
  loadingText,
  disabled,
  variant = "primary",
  className = "",
  type = "button",
}) => {
  const baseClasses =
    "w-full rounded-xl text-sm font-medium cursor-pointer transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses =
    variant === "primary"
      ? "h-11 text-white bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 border border-blue-300/40 backdrop-blur-md hover:shadow-[0_0_10px_rgba(59,130,246,0.75)] hover:from-blue-400 hover:via-blue-600 hover:to-blue-800"
      : "h-12 mt-4 bg-gray-800/50 hover:bg-gray-800/70 text-white border border-gray-700/50";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          {loadingText}
        </span>
      ) : (
        buttonText
      )}
    </button>
  );
};

export default MyButton;
