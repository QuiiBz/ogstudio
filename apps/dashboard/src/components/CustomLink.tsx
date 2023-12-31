import Link from "next/link"
import type { ComponentProps, ReactNode } from "react"

interface CustomLinkProps {
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  href: string
  target?: ComponentProps<typeof Link>['target']
  children: ReactNode
}

export function CustomLink({ icon, iconPosition = 'left', href, target, children }: CustomLinkProps) {
  return (
    <Link className="flex gap-2 items-center px-3 py-1 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-50 select-none" href={href} target={target}>
      {icon && iconPosition === 'left' ? icon : null}
      {children}
      {icon && iconPosition === 'right' ? icon : null}
    </Link>
  )
}

