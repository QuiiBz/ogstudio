import {
  elementsToReactElements,
  exportToPng,
  exportToSvg,
} from "../../../../../lib/export";
import { TEMPLATES, toTemplateSlug } from "../../../../../lib/templates";
import { loadFonts } from "../../../../../lib/fonts";

export function generateStaticParams() {
  return TEMPLATES.map((template) => ({ slug: toTemplateSlug(template) }));
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const template = TEMPLATES.find(
    (current) => toTemplateSlug(current) === decodedSlug,
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
