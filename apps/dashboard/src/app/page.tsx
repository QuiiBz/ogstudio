'use client'
import type { MouseEvent, ReactNode } from "react";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { OgEditor } from "../components/OgEditor";
import { INITIAL_ELEMENTS, createElementId } from "../lib/elements";
import { DeleteIcon } from "../components/icons/DeleteIcon";
import { AddIcon } from "../components/icons/AddIcon";
import type { OGElement } from "../lib/types";
import { OgImage } from "../components/OgImage";

interface OgImageWrapperProps {
  href: string
  elements?: OGElement[]
  children?: ReactNode
  deletable?: (event: MouseEvent<HTMLSpanElement>) => void
}

function OgImageWrapper({ href, elements, children, deletable }: OgImageWrapperProps) {
  return (
    <Link className="h-32 min-w-60 flex items-center justify-center text-gray-600 border rounded border-gray-200 hover:border-gray-300 relative group" href={href}>
      {elements ? (
        <Suspense fallback={<div className="animate-pulse w-3/4 h-1/6 bg-gray-100 rounded-full" />}>
          <OgImage elements={elements} />
        </Suspense>
      ) : null}
      {children}
      {deletable ? (
        <span className="absolute right-0 top-0 p-2 text-gray-600 hover:text-gray-900 hidden group-hover:block" onClick={deletable} role="button">
          <DeleteIcon />
        </span>
      ) : null}
    </Link>
  )
}

interface OGImage {
  id: string
  content: OGElement[]
}

export default function Home() {
  const [ogImages, setOgImages] = useState<OGImage[]>([])

  useEffect(() => {
    const images = Object.keys(localStorage).reduce<OGImage[]>((acc, current) => {
      if (current.startsWith('og-')) {
        acc.push({
          id: current,
          content: JSON.parse(localStorage.getItem(current) || '[]') as OGElement[]
        })
      }

      return acc
    }, [])

    setOgImages(images)
  }, [])

  function deleteOgImage(ogImage: string) {
    return function onClick(event: MouseEvent<HTMLSpanElement>) {
      event.preventDefault();
      event.stopPropagation();

      localStorage.removeItem(ogImage)
      setOgImages(ogImages.filter((image) => image.id !== ogImage))
    }
  }

  return (
    <>
      <OgEditor height={630} initialElements={INITIAL_ELEMENTS} localStorageKey="splash" width={1200} />
      <div className="w-screen h-screen bg-black/20 flex justify-center items-center absolute top-0 left-0 z-10">
        <div className="p-8 rounded-md bg-white shadow-lg shadow-gray-300 max-w-3xl">
          <div className="flex flex-col gap-2">
            <h2 className="text-gray-800 text-xl">Templates</h2>
            <div className="flex gap-2 overflow-x-scroll no-scrollbar">
              <OgImageWrapper elements={[]} href="/" />
              <OgImageWrapper elements={[]} href="/" />
              <OgImageWrapper elements={[]} href="/" />
            </div>
          </div>
          <div className="h-[1px] w-full bg-gray-100 my-6" />
          <div className="flex flex-col gap-2">
            <h2 className="text-gray-800 text-xl">My OG images</h2>
            <div className="flex gap-2 overflow-x-scroll no-scrollbar">
              <OgImageWrapper href={`/${createElementId()}`}>
                <AddIcon height="1.4em" width="1.4em" /> Start from scratch
              </OgImageWrapper>
              {ogImages.map(ogImage => {
                return (
                  <OgImageWrapper deletable={deleteOgImage(ogImage.id)} elements={ogImage.content} href={`/${ogImage.id.replace('og-', '')}`} key={ogImage.id} />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
