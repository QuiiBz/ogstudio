import Link from "next/link"
import type { ReactNode } from "react"

interface CustomLinkProps {
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  href: string
  children: ReactNode
}

export function CustomLink({ icon, iconPosition = 'left', href, children }: CustomLinkProps) {
  return (
    <Link className="flex gap-2 items-center px-3 py-1 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-50" href={href}>
      {icon && iconPosition === 'left' ? icon : null}
      {children}
      {icon && iconPosition === 'right' ? icon : null}
    </Link>
  )
}

