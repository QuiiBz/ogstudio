"use client";
import { useRouter } from "next/navigation";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { type OGImage, useImagesStore } from "../../stores/imagesStore";
import { createElementId } from "../../lib/elements";
import { useSavedImages } from "../../lib/hooks/useSavedImages";

export function HomeSplashTitle() {
  const { createImage } = useImagesStore();
  const router = useRouter();
  const images = useSavedImages();

  return (
    <Flex direction="column" align="center" gap="2" py="8">
      <Heading
        as="h1"
        size="7"
        weight="medium"
        align="center"
        className="w-2/3 lg:w-full font-[Raleway]"
      >
        Create beautiful Open Graph images
      </Heading>
      <Text as="p" className="w-2/3 md:w-1/3" size="2" align="center">
        Create static or dynamic Open Graph images with an intuitive, Figma-like
        visual editor.
      </Text>
      <Flex gap="2" mt="4" align="center">
        <Button
          className="cursor-pointer"
          color="indigo"
          variant="classic"
          radius="full"
          onClick={() => {
            if (images.length) {
              router.push("/my-images");
              return;
            }

            const image: OGImage = {
              name: "New Image",
              id: createElementId(),
            };
            router.push(`/editor?i=${image.id}`);
            createImage(image);
          }}
        >
          {images.length ? "View my images" : "Try the editor"}
        </Button>
        <Button asChild color="gray" variant="ghost" radius="full" mt="auto">
          <Link href="/templates">View templates</Link>
        </Button>
      </Flex>
    </Flex>
  );
}
