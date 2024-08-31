import { initWasm } from "@resvg/resvg-wasm";
import {
  elementsToReactElements,
  exportToPng,
  exportToSvg,
} from "../../../../../lib/export";
import { TEMPLATES } from "../../../../../lib/templates";
import { loadFonts } from "../../../../../lib/fonts";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const resvg = fs.readFileSync(
  url.fileURLToPath(path.join(import.meta.url, '../../resvg.wasm'))
)
const initWasmPromise = initWasm(resvg);

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
