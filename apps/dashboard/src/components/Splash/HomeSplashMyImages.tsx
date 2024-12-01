"use client";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { type OGImage, useImagesStore } from "../../stores/imagesStore";
import { OgImage } from "../OgImage";
import { AddIcon } from "../icons/AddIcon";
import type { OGElement } from "../../lib/types";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";
import { createElementId } from "../../lib/elements";

export function HomeSplashMyImages() {
  const { images, createImage, copyImage, deleteImage } = useImagesStore();
  const router = useRouter();

  return (
    <Flex direction="column" gap="4">
      <Flex align="center" justify="between">
        <Heading as="h2" size="5" weight="regular">
          My images
        </Heading>
        <Button asChild color="gray" radius="full" variant="ghost">
          <Link href="/my-images">
            See all ({images.length})
            <ArrowRightIcon />
          </Link>
        </Button>
      </Flex>
      <Flex gap="2" className="overflow-x-scroll max-w-[100vw] no-scrollbar">
        <OgImage
          onClick={() => {
            const image: OGImage = {
              name: "New Image",
              id: createElementId(),
            };
            router.push(`/editor?i=${image.id}`);
            createImage(image);
          }}
        >
          <Flex align="center" gap="1">
            <AddIcon height="1.4em" width="1.4em" />
            <Text as="span" size="2">
              Start from scratch
            </Text>
          </Flex>
        </OgImage>
        {images.slice(0, 2).map((image) => (
          <OgImage
            client
            copiable={() => {
              copyImage(image);
            }}
            deletable={() => {
              deleteImage(image);
            }}
            elements={
              JSON.parse(localStorage.getItem(image.id) ?? "[]") as OGElement[]
            }
            href={`/editor?i=${image.id}`}
            key={image.id}
            mockDynamicTexts
            name={image.name}
          />
        ))}
      </Flex>
    </Flex>
  );
}
