import { kv } from "@vercel/kv";
import { initWasm } from "@resvg/resvg-wasm";
import type { NextRequest } from "next/server";
import type { OGElement } from "../../../../lib/types";
import {
  elementsToReactElements,
  exportToPng,
  exportToSvg,
} from "../../../../lib/export";
import { loadFonts } from "../../../../lib/fonts";
// @ts-expect-error -- this file does exist
import resvgWasm from "./resvg.wasm?module";

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- wrong type
const initWasmPromise = initWasm(resvgWasm);

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params: { key } }: { params: { key: string } },
) {
  const elements = await kv.get(atob(key));

  if (elements === null) {
    return Response.json("Not found", { status: 404 });
  }

  const ogElements = elements as OGElement[];
  const dynamicTexts = Object.fromEntries(
    request.nextUrl.searchParams.entries(),
  );

  const reactElements = elementsToReactElements(ogElements, dynamicTexts);
  await initWasmPromise;
  const fonts = await loadFonts(ogElements);
  const svg = await exportToSvg(reactElements, fonts);
  const png = await exportToPng(svg);

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
