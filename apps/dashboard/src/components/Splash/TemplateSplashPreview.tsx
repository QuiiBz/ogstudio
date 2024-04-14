"use client";
import { Flex } from "@radix-ui/themes";
import type { ReactNode } from "react";
import { OgImage } from "../OgImage";
import { usePreviewControls } from "../../lib/hooks/usePreviewControls";

interface TemplateSplashPreviewProps {
  image: ReactNode;
}

export function TemplateSplashPreview({ image }: TemplateSplashPreviewProps) {
  const { preview, PreviewControls } = usePreviewControls();

  return (
    <Flex direction="column" gap="4">
      <OgImage preview={preview} size="medium">
        {image}
      </OgImage>
      <PreviewControls />
    </Flex>
  );
}
