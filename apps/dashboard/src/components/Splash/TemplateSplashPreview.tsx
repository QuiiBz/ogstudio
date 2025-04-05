"use client";
import { Flex } from "@radix-ui/themes";
import { type ReactNode } from "react";
import { OgImage } from "../OgImage";
import { usePreviewControls } from "../../lib/hooks/usePreviewControls";
import { useIsMobile } from "../../lib/hooks/useIsMobile";

interface TemplateSplashPreviewProps {
  image: ReactNode;
}

export function TemplateSplashPreview({ image }: TemplateSplashPreviewProps) {
  const { preview, PreviewControls } = usePreviewControls();
  const isMobile = useIsMobile();

  return (
    <Flex direction="column" gap="2" width="fit-content" mx="auto">
      <PreviewControls />
      <OgImage preview={preview} size={isMobile ? "small" : "medium"}>
        {image}
      </OgImage>
    </Flex>
  );
}
