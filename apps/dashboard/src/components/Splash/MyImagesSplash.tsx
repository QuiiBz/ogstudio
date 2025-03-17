"use client";
import { useRouter } from "next/navigation";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { AddIcon } from "../icons/AddIcon";
import { type OGImage, useImagesStore } from "../../stores/imagesStore";
import { OgImage } from "../OgImage";
import { createElementId } from "../../lib/elements";
import { useSavedImages } from "../../lib/hooks/useSavedImages";
import { useDeletedSavedImage } from "../../lib/hooks/useDeletedSavedImage";

export function MyImagesSplash() {
  const { createImage, copyImage, deleteImage } = useImagesStore();
  const images = useSavedImages();
  const router = useRouter();
  const deleteSavedImage = useDeletedSavedImage();

  return (
    <>
      <Flex direction="column" align="center" gap="2" py="8">
        <Heading
          as="h1"
          size="7"
          weight="medium"
          align="center"
          className="w-2/3 lg:w-full font-[Raleway]"
        >
          My Open Graph images
        </Heading>
      </Flex>
      <Grid
        className="overflow-y-scroll no-scrollbar grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        mx="auto"
        width="fit-content"
        gap="4"
      >
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
        {images.map((image) => (
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
      </Grid>
    </>
  );
}
