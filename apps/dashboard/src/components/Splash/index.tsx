'use client'
import type { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { OgEditor } from "../OgEditor";
import { CustomLink } from "../CustomLink";
import { GitHubIcon } from "../icons/GitHubIcon";

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
        <div className="w-screen h-screen bg-black/10 flex justify-center items-center absolute top-0 left-0 z-10">
          <div className="p-8 rounded-md bg-white shadow-lg shadow-gray-200 w-[980px] h-[684px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-gray-900 text-2xl">OG Studio</h1>
                <span className="flex gap-2 items-center px-3 py-1 rounded-full text-white bg-yellow-500 select-none text-xs">
                  Early preview
                </span>
                <CustomLink href="https://github.com/QuiiBz/ogstudio" icon={<GitHubIcon />} target="_blank">
                  GitHub
                </CustomLink>
              </div>
              <CustomLink href="/" icon={<div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />} iconPosition="right">
                Guest
              </CustomLink>
            </div>
            <p className="text-sm text-gray-600 mt-2 w-2/3">Create static or dynamic Open Graph images with an intuitive, Figma-like visual editor. Browse ready-to-use templates, and export your images to SVG/PNG or to a dynamic URL.</p>
            <div className="h-[1px] w-full bg-gray-100 my-8" />
            {children}
          </div>
        </div>
      )}
    </>
  )
}

