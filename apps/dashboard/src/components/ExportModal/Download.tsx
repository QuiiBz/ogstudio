import { Button, Flex, Heading } from "@radix-ui/themes";
import { useState } from "react";
import { flushSync } from "react-dom";
import { PngIcon } from "../icons/PngIcon";
import { SvgIcon } from "../icons/SvgIcon";
import { useElementsStore } from "../../stores/elementsStore";
import {
  elementsToReactElements,
  exportToPng,
  exportToSvg,
} from "../../lib/export";
import { loadFonts } from "../../lib/fonts";

interface DownloadProps {
  dynamicTexts: Record<string, string>;
}

export function Download({ dynamicTexts }: DownloadProps) {
  const elements = useElementsStore((state) => state.elements);
  const setSelectedElementId = useElementsStore(
    (state) => state.setSelectedElementId,
  );
  const [isLoading, setIsLoading] = useState(false);

  async function exportSvg(open = true) {
    // Immediately deselect any selected element to remove the selection box
    flushSync(() => {
      setSelectedElementId(null);
    });

    setIsLoading(true);
    const reactElements = elementsToReactElements(elements, dynamicTexts);
    const fonts = await loadFonts(elements);
    const svg = await exportToSvg(reactElements, fonts);
    setIsLoading(false);

    if (open) {
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      window.open(url);
    }

    return svg;
  }

  async function exportPng() {
    const svg = await exportSvg(false);

    setIsLoading(true);
    const png = await exportToPng(svg);
    setIsLoading(false);

    const blob = new Blob([png], { type: "image/png" });
    const url = URL.createObjectURL(blob);
    window.open(url);
  }

  return (
    <Flex direction="column" gap="4">
      <Heading as="h2" size="5" weight="regular">
        Download
      </Heading>
      <Flex gap="2" mt="2">
        <Button
          color="indigo"
          disabled={isLoading}
          onClick={() => exportSvg()}
          variant="soft"
          radius="full"
        >
          <SvgIcon />
          Download SVG
        </Button>
        <Button
          color="indigo"
          disabled={isLoading}
          onClick={() => exportPng()}
          variant="soft"
          radius="full"
        >
          <PngIcon />
          Download PNG
        </Button>
      </Flex>
    </Flex>
  );
}
