"use client";
import { useRouter } from "next/navigation";
import { Button, Text } from "@radix-ui/themes";
import Link from "next/link";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import { AddIcon } from "../icons/AddIcon";
import { useImagesStore } from "../../stores/imagesStore";
import type { OGElement } from "../../lib/types";
import { OgImage } from "../OgImage";

export function MyImagesSplash() {
  const { images, createEmptyImage, copyImage, deleteImage } = useImagesStore();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Text size="5">My images</Text>
        <Button asChild color="gray" radius="full" variant="ghost">
          <Link href="/">
            <ArrowLeftIcon />
            Back
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2 max-h-[427px] overflow-y-scroll no-scrollbar">
        <OgImage
          onClick={() => {
            const { id } = createEmptyImage();
            router.push(`/editor?i=${id}`);
          }}
        >
          <AddIcon height="1.4em" width="1.4em" /> Start from scratch
        </OgImage>
        {images.map((image) => (
          <OgImage
            copiable={() => copyImage(image)}
            deletable={() => {
              deleteImage(image);
            }}
            elements={
              JSON.parse(localStorage.getItem(image.id) || "[]") as OGElement[]
            }
            href={`/editor?i=${image.id}`}
            key={image.id}
            mockDynamicTexts
            name={image.name}
          />
        ))}
      </div>
    </div>
  );
}
