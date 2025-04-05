"use client";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { type OGImage, useImagesStore } from "../../stores/imagesStore";
import { OgImage } from "../OgImage";
import { AddIcon } from "../icons/AddIcon";
import { createElementId } from "../../lib/elements";
import { useSavedImages } from "../../lib/hooks/useSavedImages";
import { useDeletedSavedImage } from "../../lib/hooks/useDeletedSavedImage";

export function HomeSplashMyImages() {
  const { createImage, copyImage, deleteImage } = useImagesStore();
  const images = useSavedImages();
  const router = useRouter();
  const deleteSavedImage = useDeletedSavedImage();

  return (
    <Flex
      gap="2"
      className="overflow-x-scroll max-w-[100vw] no-scrollbar"
      pt="8"
    >
      <Flex
        direction="column"
        gap="2"
        minWidth="300px"
        width="300px"
        className="mr-4 lg:mr-[90px]"
      >
        <Heading as="h2" size="5" weight="medium" className="font-[Raleway]">
          {images.length ? "Jump back where you were" : "Or create your own"}
        </Heading>
        <Text as="p" size="2">
          Create your own Open Graph images from scratch and export them as
          SVG/PNG or to dynamic URLs.
        </Text>
        {images.length ? (
          <Button
            asChild
            className="w-fit"
            color="indigo"
            variant="soft"
            radius="full"
            mt="auto"
          >
            <Link href="/my-images">View my images</Link>
          </Button>
        ) : null}
      </Flex>
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
  );
}
