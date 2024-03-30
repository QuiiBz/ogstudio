"use client";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useImagesStore } from "../../stores/imagesStore";
import { OgImage } from "../OgImage";
import { AddIcon } from "../icons/AddIcon";
import type { OGElement } from "../../lib/types";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";

export function HomeSplashMyImages() {
  const { images, createEmptyImage, copyImage, deleteImage } = useImagesStore();
  const router = useRouter();

  return (
    <Flex direction="column" gap="4">
      <Flex align="center" justify="between">
        <Text size="5">My images</Text>
        <Button asChild color="gray" radius="full" variant="ghost">
          <Link href="/my-images">
            See all ({images.length})
            <ArrowRightIcon />
          </Link>
        </Button>
      </Flex>
      <Flex gap="2">
        <OgImage
          onClick={() => {
            const { id } = createEmptyImage();
            router.push(`/editor/${id}`);
          }}
        >
          <AddIcon height="1.4em" width="1.4em" />
          <Text as="span" size="2">
            Start from scratch
          </Text>
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
              JSON.parse(localStorage.getItem(image.id) || "[]") as OGElement[]
            }
            href={`/editor/${image.id}`}
            key={image.id}
            mockDynamicTexts
            name={image.name}
          />
        ))}
      </Flex>
    </Flex>
  );
}
