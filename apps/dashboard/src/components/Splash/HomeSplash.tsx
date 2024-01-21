"use client";
import { useRouter } from "next/navigation";
import { CustomLink } from "../CustomLink";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";
import { AddIcon } from "../icons/AddIcon";
import type { OGElement } from "../../lib/types";
import { TEMPLATES } from "../../lib/templates";
import { useImagesStore } from "../../stores/imagesStore";
import { OgImage } from "../OgImage";

export function HomeSplash() {
  const { images, createEmptyImage, copyImage, deleteImage } = useImagesStore();
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-gray-800 text-xl">Templates</h2>
          <CustomLink
            href="/templates"
            icon={<ArrowRightIcon />}
            iconPosition="right"
          >
            See all
          </CustomLink>
        </div>
        <div className="flex gap-2">
          {TEMPLATES.slice(0, 3).map((template) => (
            <OgImage
              elements={template.elements}
              href={`/templates/${template.name.toLowerCase()}`}
              key={template.name}
              name={template.name}
            />
          ))}
        </div>
      </div>
      <div className="h-[1px] w-full bg-gray-100 my-8" />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-gray-800 text-xl">My images</h2>
          <CustomLink
            href="/my-images"
            icon={<ArrowRightIcon />}
            iconPosition="right"
          >
            See all
          </CustomLink>
        </div>
        <div className="flex gap-2">
          <OgImage
            onClick={() => {
              const { id } = createEmptyImage();
              router.push(`/?i=${id}`);
            }}
          >
            <AddIcon height="1.4em" width="1.4em" /> Start from scratch
          </OgImage>
          {images.slice(0, 2).map((image) => (
            <OgImage
              copiable={() => copyImage(image)}
              deletable={() => {
                deleteImage(image);
              }}
              elements={
                JSON.parse(
                  localStorage.getItem(image.id) || "[]",
                ) as OGElement[]
              }
              href={`/?i=${image.id}`}
              key={image.id}
              name={image.name}
            />
          ))}
        </div>
      </div>
    </>
  );
}
