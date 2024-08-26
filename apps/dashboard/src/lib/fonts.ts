import type { OGElement } from "./types";
import { unstable_cache } from "next/cache";

export const DEFAULT_FONTS = [
  "Roboto",
  "Open Sans",
  "Montserrat",
  "Lato",
  "Poppins",
  "Inter",
  "Oswald",
  "Raleway",
  "Nunito",
  "Ubuntu",
];

/**
 * Adds the font stylesheet to the document body
 * The font is loaded asynchronously, so it may not be available immediately
 * and the caller should make sure to wait for the font to be loaded before
 * using it.
 */
export function maybeLoadFont(font: string, weight: number) {
  const fontID = font.toLowerCase().replaceAll(" ", "-");
  const fontURL = getFontURL(font, weight);

  // Check if we've already added this font
  if (document.getElementById(fontID)) {
    return; // Font style has already been added, no need to add it again
  }

  // Create a style element
  const style = document.createElement("style");
  style.id = fontID;

  // Define the @font-face rule
  const fontFace = `
    @font-face {
      font-family: "${font}";
      src: url("${fontURL}") format("woff");
      font-weight: ${weight};
      font-style: normal;
    }
  `;

  // Add the @font-face rule to the style element
  style.appendChild(document.createTextNode(fontFace));

  // Append the style element to the head of the document
  document.head.appendChild(style);
}

export interface FontData {
  name: string;
  data: ArrayBuffer;
  weight: number;
}

const fontsCache = new Map<string, FontData>();

/**
 * Load all fonts used in the given elements from Bunny Fonts. The fonts are
 * returned as an `ArrayBuffer`, along with the font name and weight.
 */
export async function loadFonts(elements: OGElement[]): Promise<FontData[]> {
  // TODO: dedupe fonts
  return Promise.all(
    elements
      .filter((element) => element.tag === "p" || element.tag === "span")
      .map(async (element) => {
        const cacheKey = `${element.fontFamily}-${element.fontWeight}`;
        const fontCache = fontsCache.get(cacheKey);

        if (fontCache) {
          return fontCache;
        }

        if (element.tag !== "p" && element.tag !== "span") throw "unreachable!";

        const data = await fetch(
          getFontURL(element.fontFamily, element.fontWeight),
        ).then((response) => response.arrayBuffer());

        const fontData: FontData = {
          name: element.fontFamily,
          data,

          weight: element.fontWeight,
        };

        fontsCache.set(cacheKey, fontData);
        return fontData;
      }),
  );
}

async function getFontDataInternal() {
  interface FontsourceFont {
    id: string;
    family: string;
    subsets: string[];
    weights: number[];
    styles: string[];
    defSubset: string;
    variable: boolean;
    lastModified: Date;
    category: string;
    license: string;
    type: string;
  }

  const res = await fetch("https://api.fontsource.org/v1/fonts", {
    cache: "no-store",
  });

  const data: FontsourceFont[] = await res.json();

  return data
    .filter(({ styles }) => styles.includes("normal"))
    .filter(({ defSubset }) => defSubset === "latin")
    .map((font) => ({
      name: font.family,
      weights: font.weights,
    }));
}

export const getFontData = unstable_cache(getFontDataInternal, ["font-data"], {
  revalidate: 60 * 60 * 24 * 7,
});

export type Font = Awaited<ReturnType<typeof getFontData>>[number];

export function getFontURL(fontName: string, weight: number) {
  const fontID = fontName.toLowerCase().replaceAll(" ", "-");
  return `https://cdn.jsdelivr.net/fontsource/fonts/${fontID}@latest/latin-${weight}-normal.woff`;
}
