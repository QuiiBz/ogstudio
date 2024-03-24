"use client";
import { useRouter } from "next/navigation";
import { Button, Separator, Text } from "@radix-ui/themes";
import Link from "next/link";
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
          <Text size="5">Templates</Text>
          <Button asChild color="gray" radius="full" variant="ghost">
            <Link href="/templates">
              See all ({TEMPLATES.length})
              <ArrowRightIcon />
            </Link>
          </Button>
        </div>
        <div className="flex gap-2">
          {TEMPLATES.slice(0, 3).map((template) => (
            <OgImage
              elements={template.elements}
              href={`/templates/${template.name.toLowerCase()}`}
              key={template.name}
              mockDynamicTexts
              name={template.name}
            />
          ))}
        </div>
      </div>
      <Separator className="opacity-50" my="6" size="4" />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Text size="5">My images</Text>
          <Button asChild color="gray" radius="full" variant="ghost">
            <Link href="/my-images">
              See all ({images.length})
              <ArrowRightIcon />
            </Link>
          </Button>
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
              mockDynamicTexts
              name={image.name}
            />
          ))}
        </div>
      </div>
    </>
  );
}
