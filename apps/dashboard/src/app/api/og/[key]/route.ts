import type { NextRequest } from "next/server";
import { db, eq } from "@ogstudio/db/db";
import { imagesTable } from "@ogstudio/db/schema";
import type { OGElement } from "../../../../lib/types";
import {
  elementsToReactElements,
  exportToPng,
  exportToSvg,
} from "../../../../lib/export";
import { loadFonts } from "../../../../lib/fonts";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> },
) {
  const { key } = await params;
  const images = await db
    .select()
    .from(imagesTable)
    .where(eq(imagesTable.id, atob(key)));
  const image = images.length ? images[0] : null;

  if (image === null) {
    return Response.json("Not found", { status: 404 });
  }

  const ogElements = JSON.parse(image.elements as string) as OGElement[];
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
