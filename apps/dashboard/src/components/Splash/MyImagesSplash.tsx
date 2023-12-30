'use client'
import { useRouter } from "next/navigation";
import { CustomLink } from "../CustomLink";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import { AddIcon } from "../icons/AddIcon";
import { useImagesStore } from "../../stores/imagesStore";
import type { OGElement } from "../../lib/types";
import { OgImageWrapper } from ".";

export function MyImagesSplash() {
  const { images, createEmptyImage, copyImage, deleteImage } = useImagesStore()
  const router = useRouter()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-800 text-xl">My images</h2>
        <CustomLink href="/" icon={<ArrowLeftIcon />}>
          Back
        </CustomLink>
      </div>
      <div className="grid grid-cols-3 gap-2 max-h-[50vh] overflow-y-scroll no-scrollbar">
        <OgImageWrapper onClick={() => {
          const { id } = createEmptyImage()
          router.push(`/?i=${id}`)
        }}>
          <AddIcon height="1.4em" width="1.4em" /> Start from scratch
        </OgImageWrapper>
        {images.map(ogImage => (
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
  )
}
