'use client'
import type { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { OgEditor } from "../OgEditor";
import { CustomLink } from "../CustomLink";

interface OgSplashProps {
  children: ReactNode
}

export function Splash({ children }: OgSplashProps) {
  const searchParams = useSearchParams()
  const image = searchParams.get('i')

  return (
    <>
      <OgEditor height={630} imageId={image ?? 'splash'} width={1200} />
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

