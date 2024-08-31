import {
  elementsToReactElements,
  exportToPng,
  exportToSvg,
} from "../../../../../lib/export";
import { TEMPLATES } from "../../../../../lib/templates";
import { loadFonts } from "../../../../../lib/fonts";

export async function GET(
  _: Request,
  { params }: { params: { name: string } },
) {
  const decodedName = decodeURIComponent(params.name);
  const template = TEMPLATES.find(
    ({ name }) => name.toLowerCase() === decodedName,
  );

  if (!template) {
    return new Response("Template not found", { status: 404 });
  }

  const ogElements = template.elements;
  const reactElements = elementsToReactElements(ogElements);
  const fonts = await loadFonts(ogElements);
  const svg = await exportToSvg(reactElements, fonts);
  const png = await exportToPng(svg);

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
