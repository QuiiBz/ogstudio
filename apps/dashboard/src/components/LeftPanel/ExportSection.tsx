import { useState } from "react";
import { flushSync } from "react-dom";
import { toast } from "sonner";
import { Text, Button, Grid, Spinner, Flex, Dialog } from "@radix-ui/themes";
import { PngIcon } from "../icons/PngIcon";
import { SvgIcon } from "../icons/SvgIcon";
import {
  elementsToReactElements,
  exportToPng,
  exportToSvg,
} from "../../lib/export";
import { loadFonts } from "../../lib/fonts";
import { useElementsStore } from "../../stores/elementsStore";
import { ExportModal } from "../ExportModal";

export function ExportSection() {
  const elements = useElementsStore((state) => state.elements);
  const setSelectedElementId = useElementsStore(
    (state) => state.setSelectedElementId,
  );
  const [isLoading, setIsLoading] = useState(false);

  async function exportSvg(showProgress = true) {
    // Immediately deselect any selected element to remove the soft
    flushSync(() => {
      setSelectedElementId(null);
    });

    async function run() {
      setIsLoading(true);

      const reactElements = elementsToReactElements(elements);
      const fonts = await loadFonts(elements);
      const svg = await exportToSvg(reactElements, fonts);

      setIsLoading(false);

      return svg;
    }

    return new Promise<string>((resolve, reject) => {
      if (showProgress) {
        let svg: string;

        toast.promise(run(), {
          loading: "Exporting to SVG...",
          success: (data) => {
            resolve(data);
            svg = data;

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
    const svg = await exportSvg(false);

    let png: Uint8Array;

    async function run() {
      setIsLoading(true);
      png = await exportToPng(svg);
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
    <Flex direction="column" gap="2">
      <Text size="1">Export</Text>
      <Grid columns="2" gap="2">
        <Dialog.Root>
          <Dialog.Trigger>
            <Button className="col-span-full" color="green" variant="soft">
              <Spinner loading={isLoading}>
                <PngIcon />
              </Spinner>
              Export to URL
            </Button>
          </Dialog.Trigger>
          <Dialog.Content minWidth="980px" size="4">
            <ExportModal />
          </Dialog.Content>
        </Dialog.Root>
        <Button
          color="gray"
          disabled={isLoading}
          onClick={() => {
            void exportSvg();
          }}
          variant="soft"
        >
          <Spinner loading={isLoading}>
            <SvgIcon />
          </Spinner>
          SVG
        </Button>
        <Button
          color="gray"
          disabled={isLoading}
          onClick={() => {
            void exportPng();
          }}
          variant="soft"
        >
          <Spinner loading={isLoading}>
            <PngIcon />
          </Spinner>
          PNG
        </Button>
      </Grid>
    </Flex>
  );
}
