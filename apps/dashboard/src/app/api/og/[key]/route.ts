import { kv } from "@vercel/kv";
import type { NextRequest } from "next/server";
import type { OGElement } from "../../../../lib/types";
import {
  elementsToReactElements,
  exportToPng,
  exportToSvg,
} from "../../../../lib/export";
import { loadFonts } from "../../../../lib/fonts";

export async function GET(request: NextRequest, props: { params: Promise<{ key: string }> }) {
  const params = await props.params;

  const {
    key
  } = params;

  const elements = await kv.get(atob(key));

  if (elements === null) {
    return Response.json("Not found", { status: 404 });
  }

  const ogElements = elements as OGElement[];
  const dynamicTexts = Object.fromEntries(
    request.nextUrl.searchParams.entries(),
  );

  const reactElements = elementsToReactElements(ogElements, dynamicTexts);
  const fonts = await loadFonts(ogElements);
  const svg = await exportToSvg(reactElements, fonts);
  const png = await exportToPng(svg);

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
