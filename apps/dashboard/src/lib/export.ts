import { Resvg, initWasm } from "@resvg/resvg-wasm";
import satori from "satori";
import { toast } from "sonner";
import type { CSSProperties } from "react";
import type { OGElement } from "./types";
import { loadFonts } from "./fonts";
import { createElementStyle, createImgElementStyle } from "./elements";

let wasmInitialized = false;

export interface ReactElements {
  type: OGElement["tag"] | "img";
  props: {
    style?: CSSProperties;
    src?: string;
    children?: (ReactElements | string)[];
  };
}

/**
 * Transform a list of OG elements to React Elements, to be used with Satori
 * since we're not using a JSX transformer.
 *
 * See https://github.com/vercel/satori#use-without-jsx
 */
export function elementsToReactElements(elements: OGElement[]): ReactElements {
  // We first render the wrapper element, then all the childrens
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        width: "100%",
        height: "100%",
      },
      children: elements
        .filter((element) => element.visible)
        .map((element) => {
          const isImage = element.tag === "div" && element.backgroundImage;

          return {
            type: isImage ? "img" : element.tag,
            props: {
              style: isImage
                ? {
                    ...createElementStyle(element),
                    ...createImgElementStyle(element),
                  }
                : createElementStyle(element),
              ...(isImage ? { src: element.backgroundImage } : {}),
              ...(element.tag === "p" ? { children: [element.content] } : {}),
            },
          };
        }),
    },
  };
}

/**
 * Export React elements to an SVG string, using the provided fonts.
 */
export async function exportToSvg(
  reactElements: ReactElements,
  fonts: { name: string; data: ArrayBuffer; weight: number }[],
): Promise<string> {
  try {
    const svg = await satori(
      // @ts-expect-error wtf?
      reactElements,
      {
        width: 1200,
        height: 630,
        fonts,
      },
    );

    return svg;
  } catch (error) {
    console.error(error);

    // Firefox only recently added support for the Intl.Segmenter API
    // See https://caniuse.com/mdn-javascript_builtins_intl_segmenter
    // See https://github.com/QuiiBz/ogstudio/issues/19
    if (error instanceof Error && error.message.includes("Intl.Segmenter")) {
      toast.error(
        "Your browser does not support a required feature (Intl.Segmenter). Please update to the latest version.",
      );
    }

    return "";
  }
}

/**
 * Export an SVG string to a PNG Uint8Array, using the provided font buffers.
 */
export async function exportToPng(
  svg: string,
  fonts: Uint8Array[],
): Promise<Uint8Array> {
  if (!wasmInitialized) {
    // eslint-disable-next-line turbo/no-undeclared-env-vars -- will always be set when running the tests
    if (process.env.VITEST_POOL_ID) {
      await initWasm(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-member-access -- it actually works fine in tests
        require("node:fs/promises").readFile(
          "node_modules/@resvg/resvg-wasm/index_bg.wasm",
        ),
      );
    } else {
      await initWasm(
        fetch("https://unpkg.com/@resvg/resvg-wasm/index_bg.wasm"),
      );
    }
    wasmInitialized = true;
  }

  const resvgJS = new Resvg(svg, {
    font: {
      fontBuffers: fonts,
    },
  });
  const pngData = resvgJS.render();
  const pngBuffer = pngData.asPng();

  return pngBuffer;
}

/**
 * Render an array of OG elements to an image data URL, to be used within
 * the `src` attribute of an `img` element.
 */
export async function renderToImg(elements: OGElement[]) {
  const reactElements = elementsToReactElements(elements);
  const fonts = await loadFonts(elements);
  const svg = await exportToSvg(reactElements, fonts);

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
