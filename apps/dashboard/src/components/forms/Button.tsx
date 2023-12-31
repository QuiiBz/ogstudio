import type { ReactNode } from "react"
import { clsx } from "clsx"

interface ButtonProps {
  icon?: ReactNode
  variant?: 'danger' | 'success'
  href?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
  children: ReactNode
}

export function Button({ icon, variant, href, onClick, disabled, className, children }: ButtonProps) {
  const Tag = href ? "a" : "button"

  return (
    <Tag
      className={clsx(
        "flex gap-3 items-center px-3 py-1 border rounded select-none",
        {
          "text-red-900 bg-red-50 border-red-200 hover:border-red-300": variant === "danger",
          "text-green-900 bg-green-50 border-green-200 hover:border-green-300": variant === "success",
          "text-gray-900 bg-gray-50 border-gray-200 hover:border-gray-300": !variant,
          "cursor-not-allowed opacity-60": disabled,
        },
        className
      )}
      href={disabled ? undefined : href}
      onClick={disabled ? undefined : onClick}
      type="button">
      {icon}
      {children}
    </Tag>
  )
}
