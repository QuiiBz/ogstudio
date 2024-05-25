"use client";
import { Flex } from "@radix-ui/themes";
import { useEffect, useState, type ReactNode } from "react";
import { OgImage } from "../OgImage";
import { usePreviewControls } from "../../lib/hooks/usePreviewControls";

interface TemplateSplashPreviewProps {
  image: ReactNode;
}

export function TemplateSplashPreview({ image }: TemplateSplashPreviewProps) {
  const { preview, PreviewControls } = usePreviewControls();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <Flex direction="column" gap="4">
      <OgImage preview={preview} size={isMobile ? "small" : "medium"}>
        {image}
      </OgImage>
      <PreviewControls />
    </Flex>
  );
}
