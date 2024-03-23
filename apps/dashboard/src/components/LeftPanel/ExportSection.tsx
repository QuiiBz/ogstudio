import { startTransition, useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "../forms/Button";
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
import { Modal } from "../Modal";
import { OgImage } from "../OgImage";
import { getDynamicTextKeys } from "../../lib/elements";
import { Input } from "../forms/Input";
import { CustomLink } from "../CustomLink";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import { useUser } from "../../lib/hooks/useUser";
import { Tooltip } from "../Tooltip";

interface ExportModalProps {
  close: () => void;
}

function ExportModal({ close }: ExportModalProps) {
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

    exportUrl().catch(console.error);
  }, [selectedImageId, elements, isSignedIn]);

  function changeType(newType: typeof type) {
    return () => {
      startTransition(() => {
        setType(newType);
      });
    };
  }

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

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-gray-900 text-2xl">Export to URL</h2>
        <CustomLink icon={<ArrowLeftIcon />} onClick={close}>
          Continue editing
        </CustomLink>
      </div>
      <p className="text-sm text-gray-600 w-2/3 mt-2">
        Export your Open Graph image to an URL that you can then use in your
        website. You can also see a preview of the OG Image and edit any dynamic
        text in real-time.
      </p>
      <div className="h-[1px] w-full bg-gray-100 my-8" />
      <div className="flex flex-col gap-4">
        <h2 className="text-gray-800 text-xl">Preview</h2>
        <div className="flex justify-between gap-8">
          <OgImage
            dynamicTexts={dynamicTexts}
            elements={elements}
            size="medium"
          />
          <div className="flex flex-col gap-4 w-full">
            {dynamicTextKeys.map((dynamicKey) => (
              <div className="flex flex-col gap-2" key={dynamicKey}>
                <p className="text-gray-600 text-xs">{dynamicKey}</p>
                <Input
                  onChange={(value) => {
                    startTransition(() => {
                      setDynamicTexts((prev) => ({
                        ...prev,
                        [dynamicKey]: value,
                      }));
                    });
                  }}
                  type="text"
                  value={dynamicTexts[dynamicKey]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-gray-100 my-8" />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-800 text-xl">Embed</h2>
          <div className="flex gap-2">
            <Button disabled={type === "html"} onClick={changeType("html")}>
              HTML
            </Button>
            <Button disabled={type === "url"} onClick={changeType("url")}>
              URL
            </Button>
          </div>
        </div>
        <Tooltip
          content={
            isSignedIn ? undefined : (
              <>
                <Link className="underline" href="/login" onClick={close}>
                  Sign in
                </Link>
                &nbsp;to export to an URL
              </>
            )
          }
        >
          <pre
            className="font-mono p-3 rounded text-gray-900 bg-gray-50 text-wrap"
            style={{ wordBreak: "break-all" }}
          >
            {type === "html" ? (
              <>
                &lt;head&gt;
                <br />
                &nbsp;&nbsp;&lt;meta property=&quot;og:image&quot;
                content=&quot;
                {url}&quot;&gt;
                <br />
                &lt;/head&gt;
              </>
            ) : null}
            {type === "url" ? url : null}
          </pre>
        </Tooltip>
      </div>
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
    <>
      <p className="text-xs text-gray-600">Export</p>
      <div className="grid grid-cols-2 gap-2 w-full">
        <Modal
          action={
            <Button
              className="col-span-full"
              disabled={isLoading}
              icon={<PngIcon />}
              variant="success"
            >
              Export to URL
            </Button>
          }
        >
          {({ close }) => <ExportModal close={close} />}
        </Modal>
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
