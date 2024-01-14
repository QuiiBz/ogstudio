import { useState } from "react";
import { flushSync } from "react-dom";
import { toast } from "sonner";
import { Button } from "../forms/Button";
import { PngIcon } from "../icons/PngIcon";
import { SvgIcon } from "../icons/SvgIcon";
import {
  elementsToReactElements,
  exportToPng,
  exportToSvg,
} from "../../lib/export";
import type { FontData } from "../../lib/fonts";
import { loadFonts } from "../../lib/fonts";
import { useElementsStore } from "../../stores/elementsStore";
import type { ExportRequest, ExportResponse } from "../../app/api/export/route";
import { useImagesStore } from "../../stores/imagesStore";

export function ExportSection() {
  const elements = useElementsStore((state) => state.elements);
  const setSelectedElementId = useElementsStore(
    (state) => state.setSelectedElementId,
  );
  const selectedImageId = useImagesStore((state) => state.selectedImageId);
  const [isLoading, setIsLoading] = useState(false);

  function exportUrl() {
    let theKey: string;

    async function run() {
      if (!selectedImageId) {
        return;
      }

      const response = await fetch("/api/export", {
        method: "POST",
        body: JSON.stringify({
          id: selectedImageId,
          elements,
        } satisfies ExportRequest),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const { key } = (await response.json()) as ExportResponse;
      theKey = key;
    }

    toast.promise(run(), {
      loading: "Exporting to URL...",
      success: "URL exported!",
      error: "Failed to export to URL",
      action: {
        label: "Copy URL",
        onClick: async () => {
          await navigator.clipboard.writeText(
            `${window.location.origin}/api/og/${theKey}`,
          );
        },
      },
    });
  }

  async function exportSvg(showProgress = true) {
    // Immediately deselect any selected element to remove the outline
    flushSync(() => {
      setSelectedElementId(null);
    });

    async function run() {
      setIsLoading(true);

      const reactElements = elementsToReactElements(elements);
      const fonts = await loadFonts(elements);
      const svg = await exportToSvg(reactElements, fonts);

      setIsLoading(false);

      return { fonts, svg };
    }

    return new Promise<{
      fonts: FontData[];
      svg: string;
    }>((resolve, reject) => {
      if (showProgress) {
        let svg: string;

        toast.promise(run(), {
          loading: "Exporting to SVG...",
          success: (data) => {
            resolve(data);
            svg = data.svg;

            return "SVG exported!";
          },
          action: {
            label: "Download",
            onClick: () => {
              const blob = new Blob([svg], { type: "image/svg+xml" });
              const url = URL.createObjectURL(blob);
              window.open(url);
            },
          },
        });
      }

      run().then(resolve).catch(reject);
    });
  }

  async function exportPng() {
    const { svg, fonts } = await exportSvg(false);

    let png: Uint8Array;

    async function run() {
      setIsLoading(true);

      png = await exportToPng(
        svg,
        fonts.map((font) => new Uint8Array(font.data)),
      );

      setIsLoading(false);
    }

    toast.promise(run(), {
      loading: "Exporting to PNG...",
      success: "PNG exported!",
      action: {
        label: "Download",
        onClick: () => {
          const blob = new Blob([png], { type: "image/png" });
          const url = URL.createObjectURL(blob);
          window.open(url);
        },
      },
    });
  }

  return (
    <>
      <p className="text-xs text-gray-600">Export</p>
      <div className="grid grid-cols-2 gap-2 w-full">
        <Button
          className="col-span-full"
          icon={<PngIcon />}
          onClick={exportUrl}
          variant="success"
        >
          Export to URL
        </Button>
        <Button disabled={isLoading} icon={<SvgIcon />} onClick={exportSvg}>
          SVG
        </Button>
        <Button disabled={isLoading} icon={<PngIcon />} onClick={exportPng}>
          PNG
        </Button>
      </div>
    </>
  );
}
