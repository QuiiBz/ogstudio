import type { ReactNode } from "react"

interface ButtonProps {
  icon?: ReactNode
  variant?: 'danger'
  onClick: () => void
  className?: string
  children: ReactNode
}

export function Button({ icon, variant, onClick, className, children }: ButtonProps) {
  return (
    <button className={`flex gap-3 items-center px-3 py-1 border rounded ${variant === 'danger' ? 'text-red-900 bg-red-50 border-red-200 hover:border-red-300' : 'text-gray-900 bg-gray-50 border-gray-200 hover:border-gray-300'} ${className}`} onClick={onClick} type="button">
      {icon}
      {children}
    </button>
  )
}
