import type { ReactNode } from "react";
import { clsx } from "clsx";

interface ButtonProps {
  icon?: ReactNode;
  variant?: "danger" | "success";
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
  children: ReactNode;
}

export function Button({
  icon,
  variant,
  onClick,
  isLoading,
  className,
  children,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "flex gap-3 items-center px-3 py-1 border rounded select-none",
        {
          "text-red-900 bg-red-50 border-red-200 hover:border-red-300":
            variant === "danger",
          "text-green-900 bg-green-50 border-green-200 hover:border-green-300":
            variant === "success",
          "text-gray-900 bg-gray-50 border-gray-200 hover:border-gray-300":
            !variant,
          "cursor-not-allowed opacity-60": isLoading,
        },
        className,
      )}
      onClick={isLoading ? undefined : onClick}
      type="button"
    >
      {icon}
      {children}
    </button>
  );
}
