import { startTransition, useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { toast } from "sonner";
import Link from "next/link";
import {
  Text,
  Button,
  Grid,
  Spinner,
  Flex,
  Dialog,
  Separator,
  SegmentedControl,
  TextField,
  Code,
  Tooltip,
} from "@radix-ui/themes";
import { PngIcon } from "../icons/PngIcon";
import { SvgIcon } from "../icons/SvgIcon";
import {
  elementsToReactElements,
  exportToPng,
  exportToSvg,
} from "../../lib/export";
import { loadFonts } from "../../lib/fonts";
import { useElementsStore } from "../../stores/elementsStore";
import type {
  ExportRequest,
  ExportResponse,
} from "../../app/api/og/export/route";
import { useImagesStore } from "../../stores/imagesStore";
import { OgImage } from "../OgImage";
import { getDynamicTextKeys } from "../../lib/elements";
import { useUser } from "../../lib/hooks/useUser";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";

function ExportModal() {
  const elements = useElementsStore((state) => state.elements);
  const selectedImageId = useImagesStore((state) => state.selectedImageId);
  const dynamicTextKeys = useMemo(
    () => getDynamicTextKeys(elements),
    [elements],
  );
  const [dynamicTexts, setDynamicTexts] = useState<Record<string, string>>(() =>
    Object.fromEntries(dynamicTextKeys.map((key) => [key, "Dynamic text"])),
  );
  const [key, setKey] = useState<string | null>(null);
  const [type, setType] = useState<"html" | "url">("html");
  const { data } = useUser();
  const isSignedIn = Boolean(data && "user" in data);

  useEffect(() => {
    async function exportUrl() {
      if (!selectedImageId || !isSignedIn) {
        return;
      }

      const response = await fetch("/api/og/export", {
        method: "POST",
        body: JSON.stringify({
          id: selectedImageId,
          elements,
        } satisfies ExportRequest),
      });

      if (!response.ok) {
        const error = ((await response.json()) as { error: string }).error;

        throw new Error(error);
      }

      const json = (await response.json()) as ExportResponse;
      setKey(json.key);
    }

    void exportUrl();
  }, [selectedImageId, elements, isSignedIn]);

  const finalKey = key ? (
    key
  ) : (
    <span className="blur-sm">{"x".repeat(32)}</span>
  );
  let url = (
    <>
      {window.location.origin}/api/og/{finalKey}
    </>
  );

  if (dynamicTextKeys.length > 0) {
    url = (
      <>
        {url}
        <b>
          ?
          {encodeURI(
            dynamicTextKeys
              .map((current) => `${current}=${dynamicTexts[current]}`)
              .join("&"),
          )}
        </b>
      </>
    );
  }

  const code = (
    <Code
      className="p-3"
      color="gray"
      highContrast
      size="4"
      style={{ wordBreak: "break-all" }}
    >
      {type === "html" ? (
        <>
          &lt;head&gt;
          <br />
          &nbsp;&nbsp;&lt;meta property=&quot;og:image&quot; content=&quot;
          {url}&quot;&gt;
          <br />
          &lt;/head&gt;
        </>
      ) : null}
      {type === "url" ? url : null}
    </Code>
  );

  return (
    <>
      <Flex direction="column" gap="4">
        <Flex align="center" justify="between">
          <Text size="6">Export to URL</Text>
          <Dialog.Close>
            <Button color="gray" radius="full" variant="ghost">
              <ArrowLeftIcon />
              Continue editing
            </Button>
          </Dialog.Close>
        </Flex>
        <Text as="p" className="w-2/3" size="2">
          Export your Open Graph image to an URL that you can then use in your
          website. You can also see a preview of the OG Image and edit any
          dynamic text in real-time.
        </Text>
      </Flex>
      <Separator className="opacity-50" my="6" size="4" />
      <Flex direction="column" gap="4">
        <Text size="5">Preview</Text>
        <Flex gap="6" justify="between">
          <OgImage
            client
            dynamicTexts={dynamicTexts}
            elements={elements}
            size="medium"
          />
          <Flex direction="column" flexGrow="1" gap="4">
            {dynamicTextKeys.map((dynamicKey) => (
              <Flex direction="column" gap="2" key={dynamicKey}>
                <Text size="1">{dynamicKey}</Text>
                <TextField.Root
                  onChange={(event) => {
                    startTransition(() => {
                      setDynamicTexts({
                        ...dynamicTexts,
                        [dynamicKey]: event.target.value,
                      });
                    });
                  }}
                  value={dynamicTexts[dynamicKey]}
                />
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
      <Separator className="opacity-50" my="6" size="4" />
      <Flex direction="column" gap="4">
        <Flex align="center" justify="between">
          <Text size="5">Embed</Text>
          <SegmentedControl.Root
            onValueChange={(value) => {
              startTransition(() => {
                setType(value as typeof type);
              });
            }}
            value={type}
          >
            <SegmentedControl.Item value="html">HTML</SegmentedControl.Item>
            <SegmentedControl.Item value="url">URL</SegmentedControl.Item>
          </SegmentedControl.Root>
        </Flex>
        {isSignedIn ? (
          <>{code}</>
        ) : (
          <Tooltip
            content={
              <>
                <Dialog.Close>
                  <Link className="underline" href="/login">
                    Sign in
                  </Link>
                </Dialog.Close>
                &nbsp;to export to an URL
              </>
            }
          >
            {code}
          </Tooltip>
        )}
      </Flex>
    </>
  );
}

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
