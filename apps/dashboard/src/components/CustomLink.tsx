import type Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

interface CustomLinkProps {
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  href?: string;
  onClick?: () => void;
  target?: ComponentProps<typeof Link>["target"];
  children: ReactNode;
}

export function CustomLink({
  icon,
  iconPosition = "left",
  href,
  onClick,
  target,
  children,
}: CustomLinkProps) {
  const Tag = href ? "a" : "button";

  return (
    <Tag
      className="flex gap-2 items-center px-3 py-1 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-50 select-none"
      href={href}
      onClick={onClick}
      target={target}
    >
      {icon && iconPosition === "left" ? icon : null}
      {children}
      {icon && iconPosition === "right" ? icon : null}
    </Tag>
  );
}
