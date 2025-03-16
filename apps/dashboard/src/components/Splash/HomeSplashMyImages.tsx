"use client";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { type OGImage, useImagesStore } from "../../stores/imagesStore";
import { OgImage } from "../OgImage";
import { AddIcon } from "../icons/AddIcon";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";
import { createElementId } from "../../lib/elements";
import { useSavedImages } from "../../lib/hooks/useSavedImages";
import { useDeletedSavedImage } from "../../lib/hooks/useDeletedSavedImage";

export function HomeSplashMyImages() {
  const { createImage, copyImage, deleteImage } = useImagesStore();
  const images = useSavedImages();
  const router = useRouter();
  const deleteSavedImage = useDeletedSavedImage();

  return (
    <Flex direction="column" gap="4">
      <Flex align="center" justify="between">
        <Heading as="h2" size="5" weight="regular">
          My Open Graph images
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
          className="cursor-pointer"
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
              void deleteSavedImage(image);
            }}
            elements={image.elements}
            href={`/editor?i=${image.id}`}
            key={image.id}
            mockDynamicTexts
            name={image.name}
            cloudSaved={image.fromCloud}
          />
        ))}
      </Flex>
    </Flex>
  );
}
