'use client'
import { useRouter } from "next/navigation";
import { CustomLink } from "../CustomLink";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";
import { AddIcon } from "../icons/AddIcon";
import type { OGElement } from "../../lib/types";
import { TEMPLATES } from "../../lib/templates";
import { useImagesStore } from "../../stores/imagesStore";
import { OgImageWrapper } from ".";

export function HomeSplash() {
  const { images, copyTemplate, createEmptyImage, copyImage, deleteImage } = useImagesStore()
  const router = useRouter()

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-gray-800 text-xl">Templates</h2>
          <CustomLink href="/templates" icon={<ArrowRightIcon />} iconPosition="right">
            See all
          </CustomLink>
        </div>
        <div className="flex gap-2">
          {TEMPLATES.slice(0, 2).map((template) => (
            <OgImageWrapper elements={template.elements} key={template.name} onClick={() => {
              const { id } = copyTemplate(template)
              router.push(`/?i=${id}`)
            }} />
          ))}
        </div>
      </div>
      <div className="h-[1px] w-full bg-gray-100 my-8" />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-gray-800 text-xl">My images</h2>
          <CustomLink href="/my-images" icon={<ArrowRightIcon />} iconPosition="right">
            See all
          </CustomLink>
        </div>
        <div className="flex gap-2">
          <OgImageWrapper onClick={() => {
            const { id } = createEmptyImage()
            router.push(`/?i=${id}`)
          }}>
            <AddIcon height="1.4em" width="1.4em" /> Start from scratch
          </OgImageWrapper>
          {images.slice(0, 2).map(ogImage => (
            <OgImageWrapper
              copiable={() => copyImage(ogImage)}
              deletable={() => { deleteImage(ogImage); }}
              elements={JSON.parse(localStorage.getItem(ogImage.id) || '[]') as OGElement[]}
              href={`/?i=${ogImage.id}`}
              key={ogImage.id}
            />
          ))}
        </div>
      </div>
    </>
  )
}
