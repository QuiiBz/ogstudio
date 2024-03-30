"use client";
import { useRouter } from "next/navigation";
import { Button, Flex, Grid, Text } from "@radix-ui/themes";
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
    <Flex direction="column" gap="4">
      <Flex align="center" justify="between">
        <Text size="5">My images</Text>
        <Button asChild color="gray" radius="full" variant="ghost">
          <Link href="/">
            <ArrowLeftIcon />
            Back
          </Link>
        </Button>
      </Flex>
      <Grid
        className="max-h-[427px] overflow-y-scroll no-scrollbar"
        columns="3"
        gap="2"
      >
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
        {images.map((image) => (
          <OgImage
            copiable={() => copyImage(image)}
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
      </Grid>
    </Flex>
  );
}
