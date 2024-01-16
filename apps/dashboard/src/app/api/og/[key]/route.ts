import { kv } from "@vercel/kv";
// eslint-disable-next-line camelcase -- Next.js API
import { unstable_noStore } from "next/cache";
import type { OGElement } from "../../../../lib/types";
import {
  elementsToReactElements,
  exportToPng,
  exportToSvg,
} from "../../../../lib/export";
import { loadFonts } from "../../../../lib/fonts";

export async function GET(
  _request: Request,
  { params: { key } }: { params: { key: string } },
) {
  const elements = await kv.get(key);

  if (elements === null) {
    return Response.json("Not found", { status: 404 });
  }

  const ogElements = elements as OGElement[];

  unstable_noStore();
  const reactElements = elementsToReactElements(ogElements);
  const fonts = await loadFonts(ogElements);
  const svg = await exportToSvg(reactElements, fonts);
  const png = await exportToPng(
    svg,
    fonts.map((font) => new Uint8Array(font.data)),
  );

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
