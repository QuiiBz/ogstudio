'use client'
import type { MouseEvent, ReactNode } from "react";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { INITIAL_ELEMENTS, createElementId } from "../lib/elements";
import type { OGElement } from "../lib/types";
import type { Template } from "../lib/templates";
import { TEMPLATES } from "../lib/templates";
import { OgEditor } from "./OgEditor";
import { DeleteIcon } from "./icons/DeleteIcon";
import { AddIcon } from "./icons/AddIcon";
import { OgImage } from "./OgImage";
import { ArrowRightIcon } from "./icons/ArrowRightIcon";
import { CustomLink } from "./CustomLink";
import { ArrowLeftIcon } from "./icons/ArrowLeftIcon";

interface OgImageWrapperProps {
  href?: string
  onClick?: (event: MouseEvent<HTMLElement>) => void
  elements?: OGElement[]
  children?: ReactNode
  deletable?: (event: MouseEvent<HTMLSpanElement>) => void
}

function OgImageWrapper({ href, onClick, elements, children, deletable }: OgImageWrapperProps) {
  const Tag = href ? Link : 'button'

  return (
    <Tag className="h-[157px] w-[300px] min-w-[300px] flex items-center justify-center text-gray-600 border rounded border-gray-200 hover:border-gray-400 relative group overflow-hidden" href={href ?? ''} onClick={onClick}>
      {elements ? (
        <Suspense fallback={<div className="animate-pulse w-3/4 h-1/6 bg-gray-100 rounded-full" />}>
          <OgImage elements={elements} />
        </Suspense>
      ) : null}
      {children}
      {deletable ? (
        <button className="absolute right-0 top-0 p-2 text-gray-600 hover:text-gray-900 hidden group-hover:block" onClick={deletable} type="button">
          <DeleteIcon />
        </button>
      ) : null}
    </Tag>
  )
}

interface OGImage {
  id: string
  content: OGElement[]
}

interface OgSplashProps {
  route: 'splash' | 'templates' | 'my-images'
}

export function OgSplash({ route }: OgSplashProps) {
  const searchParams = useSearchParams();
  const image = searchParams.get('i')
  const [ogImages, setOgImages] = useState<OGImage[]>([])
  const router = useRouter()

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
  }, [image])

  function copyTemplate(template: Template) {
    return function onClick() {
      const id = createElementId()
      const key = `og-${id}`

      localStorage.setItem(key, JSON.stringify(template.elements))
      router.push(`/?i=${id}`)
    }
  }

  function deleteOgImage(ogImage: string) {
    return function onClick(event: MouseEvent<HTMLSpanElement>) {
      event.preventDefault();
      event.stopPropagation();

      localStorage.removeItem(ogImage)
      setOgImages(ogImages.filter(({ id }) => id !== ogImage))
    }
  }

  return (
    <>
      <OgEditor height={630} initialElements={INITIAL_ELEMENTS} localStorageKey={image ?? 'splash'} width={1200} />
      {image ? null : (
        <div className="w-screen h-screen bg-black/20 flex justify-center items-center absolute top-0 left-0 z-10 backdrop-blur-[1px]">
          <div className="p-8 rounded-md bg-white shadow-lg shadow-gray-300 w-[calc((300px*3)+(2rem*2)+(0.5rem*2))]">
            {route === 'splash' ? (
              <>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row justify-between items-center">
                    <h2 className="text-gray-800 text-xl">Templates</h2>
                    <CustomLink href="/templates" icon={<ArrowRightIcon />} iconPosition="right">
                      See all
                    </CustomLink>
                  </div>
                  <div className="flex gap-2">
                    {TEMPLATES.slice(0, 2).map((template) => (
                      <OgImageWrapper elements={template.elements} key={template.name} onClick={copyTemplate(template)} />
                    ))}
                  </div>
                </div>
                <div className="h-[1px] w-full bg-gray-100 my-8" />
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row justify-between items-center">
                    <h2 className="text-gray-800 text-xl">My OG images</h2>
                    <CustomLink href="/my-images" icon={<ArrowRightIcon />} iconPosition="right">
                      See all
                    </CustomLink>
                  </div>
                  <div className="flex gap-2">
                    <OgImageWrapper href={`/?i=${createElementId()}`}>
                      <AddIcon height="1.4em" width="1.4em" /> Start from scratch
                    </OgImageWrapper>
                    {ogImages.slice(0, 2).map(ogImage => (
                      <OgImageWrapper deletable={deleteOgImage(ogImage.id)} elements={ogImage.content} href={`/?i=${ogImage.id.replace('og-', '')}`} key={ogImage.id} />
                    ))}
                  </div>
                </div>
              </>
            ) : route === 'templates' ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between items-center">
                  <h2 className="text-gray-800 text-xl">All templates</h2>
                  <CustomLink href="/" icon={<ArrowLeftIcon />}>
                    Back
                  </CustomLink>
                </div>
                <div className="grid grid-cols-3 gap-2 max-h-[50vh] overflow-y-scroll no-scrollbar">
                  {TEMPLATES.map((template) => (
                    <OgImageWrapper elements={template.elements} href="/" key={template.name} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between items-center">
                  <h2 className="text-gray-800 text-xl">My OG images</h2>
                  <CustomLink href="/" icon={<ArrowLeftIcon />}>
                    Back
                  </CustomLink>
                </div>
                <div className="grid grid-cols-3 gap-2 max-h-[50vh] overflow-y-scroll no-scrollbar">
                  <OgImageWrapper href={`/?i=${createElementId()}`}>
                    <AddIcon height="1.4em" width="1.4em" /> Start from scratch
                  </OgImageWrapper>
                  {ogImages.map(ogImage => (
                    <OgImageWrapper deletable={deleteOgImage(ogImage.id)} elements={ogImage.content} href={`/?i=${ogImage.id.replace('og-', '')}`} key={ogImage.id} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
