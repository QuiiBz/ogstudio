'use client'
import type { MouseEvent, ReactNode } from "react";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { INITIAL_ELEMENTS } from "../../lib/elements";
import type { OGElement } from "../../lib/types";
import { OgEditor } from "../OgEditor";
import { DeleteIcon } from "../icons/DeleteIcon";
import { OgImage } from "../OgImage";
import { CustomLink } from "../CustomLink";
import { CopyIcon } from "../icons/CopyIcon";

interface OgImageWrapperProps {
  href?: string
  onClick?: (event: MouseEvent<HTMLElement>) => void
  elements?: OGElement[]
  children?: ReactNode
  copiable?: (event: MouseEvent<HTMLSpanElement>) => void
  deletable?: (event: MouseEvent<HTMLSpanElement>) => void
}

export function OgImageWrapper({ href, onClick, elements, children, copiable, deletable }: OgImageWrapperProps) {
  const Tag = href ? Link : 'button'

  return (
    <Tag className="h-[157px] w-[300px] min-w-[300px] flex items-center justify-center text-gray-600 border rounded border-gray-200 hover:border-gray-400 relative group overflow-hidden" href={href ?? ''} onClick={onClick}>
      {elements ? (
        <Suspense fallback={<div className="animate-pulse w-3/4 h-1/6 bg-gray-100 rounded-full" />}>
          <OgImage elements={elements} />
        </Suspense>
      ) : null}
      {children}
      {copiable ? (
        <button className="absolute right-8 top-1 p-1 bg-black/60 rounded text-gray-300 hover:text-gray-200 hidden group-hover:block" onClick={event => {
          event.preventDefault()
          copiable(event)
        }} type="button">
          <CopyIcon />
        </button>
      ) : null}
      {deletable ? (
        <button className="absolute right-1 top-1 p-1 bg-black/60 rounded text-gray-300 hover:text-gray-200 hidden group-hover:block" onClick={event => {
          event.preventDefault()
          deletable(event)
        }} type="button">
          <DeleteIcon />
        </button>
      ) : null}
    </Tag>
  )
}

interface OgSplashProps {
  children: ReactNode
}

export function Splash({ children }: OgSplashProps) {
  const searchParams = useSearchParams()
  const image = searchParams.get('i')

  return (
    <>
      <OgEditor height={630} initialElements={INITIAL_ELEMENTS} localStorageKey={image ?? 'splash'} width={1200} />
      {image ? null : (
        <div className="w-screen h-screen bg-black/10 flex justify-center items-center absolute top-0 left-0 z-10 backdrop-blur-[1px]">
          <div className="p-8 rounded-md bg-white shadow-lg shadow-gray-200 w-[980px] h-[636px]">
            <div className="flex items-center justify-between">
              <h1 className="text-gray-900 text-2xl">OG Studio</h1>
              <CustomLink href="/" icon={<div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />} iconPosition="right">
                Guest
              </CustomLink>
            </div>
            <div className="h-[1px] w-full bg-gray-100 my-8" />
            {children}
          </div>
        </div>
      )}
    </>
  )
}

