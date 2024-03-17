import { kv } from "@vercel/kv";
import { initWasm } from "@resvg/resvg-wasm";
import type { OGElement } from "../../../../lib/types";
import {
  elementsToReactElements,
  exportToPng,
  exportToSvg,
} from "../../../../lib/export";
import { loadFonts } from "../../../../lib/fonts";
import resvgWasm from "./resvg.wasm?module";

const initWasmPromise = initWasm(resvgWasm);

export const runtime = "edge";

export async function GET(
  _: Request,
  { params: { key } }: { params: { key: string } },
) {
  const elements = await kv.get(atob(key));

  if (elements === null) {
    return Response.json("Not found", { status: 404 });
  }

  const ogElements = elements as OGElement[];

  const reactElements = elementsToReactElements(ogElements);
  await initWasmPromise;
  const fonts = await loadFonts(ogElements);
  const svg = await exportToSvg(reactElements, fonts);
  const png = await exportToPng(
    svg,
    fonts.map((font) => new Uint8Array(font.data)),
  );

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(png);
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
